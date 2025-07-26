
import bomData from '../assets/bomData.json'
import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BOMDetailsView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const groupConsumptionByWidth = (consumption) => {
    const grouped = {};
    consumption.forEach((c) => {
      if (!grouped[c.width]) grouped[c.width] = c.value;
    });

    return Object.entries(grouped).map(([width, value]) => `${width} - ${value}`);
  };

  const handleExcelExport = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [];

    ['Fabric', 'Trims', 'Packaging'].forEach((type) => {
      bomData.BOMDetails
        .filter((item) => item.Type === type)
        .forEach((item) => {
          const consumptionStr = groupConsumptionByWidth(item.consumption).join(' | ');
          wsData.push({
            Type: type,
            Supplier: item.SupplierName,
            Material: item.MaterialInfo,
            Article: item.Article,
            Placement: item.Placement,
            Colors: item.Color.join(', '),
            Widths: item.Width.join(', '),
            Consumption: consumptionStr,
          });
        });
    });

    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'BOM Details');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'BOMDetails.xlsx');
  };

  const handlePDFExport = () => {
    const doc = new jsPDF();
    doc.text('BOM Details', 10, 10);

    ['Fabric', 'Trims', 'Packaging'].forEach((type, idx) => {
      const filtered = bomData.BOMDetails.filter((item) => item.Type === type);
      if (filtered.length > 0) {
        const rows = filtered.map((item) => {
          const consumptionStr = groupConsumptionByWidth(item.consumption).join(' | ');
          return [
            item.SupplierName,
            item.MaterialInfo,
            item.Article,
            item.Placement,
            item.Color.join(', '),
            item.Width.join(', '),
            consumptionStr,
          ];
        });

        doc.autoTable({
          head: [['Supplier', 'Material', 'Article', 'Placement', 'Colors', 'Widths', 'Consumption']],
          body: rows,
          startY: 20 + idx * 80,
          styles: { fontSize: 8 },
          theme: 'grid',
          margin: { top: 20 },
          didDrawPage: (data) => {
            if (idx !== 0) doc.text(type, data.settings.margin.left, data.settings.startY - 10);
          },
        });
      }
    });

    doc.save('BOMDetails.pdf');
  };

  const filteredBOM = bomData.BOMDetails.filter(
    (item) =>
      item.Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.MaterialInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.SupplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const typeColors = {
    Fabric: '#E3F2FD',
    Trims: '#F3E5F5',
    Packaging: '#F1F8E9',
  };

  const renderAccordion = (type) => {
    const filteredItems = filteredBOM.filter((item) => item.Type === type);
    if (filteredItems.length === 0) return null;

    return (
      <Accordion key={type} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: typeColors[type] }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {type}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                <TableCell><strong>Supplier</strong></TableCell>
                <TableCell><strong>Material</strong></TableCell>
                <TableCell><strong>Article</strong></TableCell>
                <TableCell><strong>Placement</strong></TableCell>
                <TableCell><strong>Colors</strong></TableCell>
                <TableCell><strong>Widths</strong></TableCell>
                <TableCell><strong>Consumption</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, idx) => {
                const consumptionStr = groupConsumptionByWidth(item.consumption).join(' | ');

                return (
                  <TableRow key={idx}>
                    <TableCell>{item.SupplierName}</TableCell>
                    <TableCell>{item.MaterialInfo}</TableCell>
                    <TableCell>{item.Article}</TableCell>
                    <TableCell>{item.Placement}</TableCell>
                    <TableCell>{item.Color.join(', ')}</TableCell>
                    <TableCell>{item.Width.join(', ')}</TableCell>
                    <TableCell>{consumptionStr}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent="space-between">
        <TextField
          size="small"
          placeholder="Search by Type, Material, Supplier"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="success"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handleExcelExport}
          >
            Excel
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handlePDFExport}
          >
            PDF
          </Button>
        </Stack>
      </Stack>

      {['Fabric', 'Trims', 'Packaging'].map((type) => renderAccordion(type))}
    </Box>
  );
};

export default BOMDetailsView;

