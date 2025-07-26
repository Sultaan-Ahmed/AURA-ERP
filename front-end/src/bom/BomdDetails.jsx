import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginBottom: 4 },
  cell: { flex: 1, paddingRight: 4 },
  bold: { fontWeight: 'bold' },
});

// PDF Document component
const BOMDetailsPDF = ({ groupedBOM }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {Object.entries(groupedBOM).map(([type, items]) => (
        <View key={type} style={styles.section}>
          <Text style={styles.header}>{type}</Text>
          <View style={{ flexDirection: "row", marginBottom: 5, borderBottomWidth: 1, borderColor: "#000" }}>
            <Text style={[styles.cell, styles.bold]}>Supplier</Text>
            <Text style={[styles.cell, styles.bold]}>Article</Text>
            <Text style={[styles.cell, styles.bold]}>Placement</Text>
            <Text style={[styles.cell, styles.bold]}>Colors</Text>
            <Text style={[styles.cell, styles.bold]}>Widths</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.SupplierName}</Text>
              <Text style={styles.cell}>{item.Article}</Text>
              <Text style={styles.cell}>{item.Placement}</Text>
              <Text style={styles.cell}>{item.Color.join(", ")}</Text>
              <Text style={styles.cell}>{item.Width.join(", ")}</Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

const BOMDetails = () => {
  const boms = useSelector((state) => state.boms);
  const { styleId } = useParams();
  const BOMDetail = boms?.boms.find((item) => item.StyleId === styleId);
  const [searchTerm, setSearchTerm] = useState("");

  const groupedBOM = BOMDetail?.BOMDetails?.reduce((acc, item) => {
    acc[item.Type] = acc[item.Type] || [];
    acc[item.Type].push(item);
    return acc;
  }, {});

  const filteredBOM = {};
  if (groupedBOM) {
    Object.entries(groupedBOM).forEach(([type, items]) => {
      filteredBOM[type] = items.filter(
        (item) =>
          item.Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.SupplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.MaterialInfo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  const exportToExcel = () => {
    if (!BOMDetail) return;

    const dataForExcel = [
      ["Type", "Supplier", "Article", "Placement", "Color", "Width"],
      ...BOMDetail.BOMDetails.map((item) => [
        item.Type,
        item.SupplierName,
        item.Article,
        item.Placement,
        item.Color.join(", "),
        item.Width.join(", "),
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(dataForExcel);
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = {
          alignment: {
            wrapText: true,
            vertical: "top",
            horizontal: "left",
          },
          font: R === 0 ? { bold: true } : {},
        };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BOM Details");
    XLSX.writeFile(workbook, "bom-details.xlsx");
  };

  const typeColors = {
    Fabric: "#E3F2FD",
    Trims: "#F3E5F5",
    Packaging: "#F1F8E9",
  };

  return (
    <>
      {BOMDetail === undefined ? (
        <>
          <Typography variant="h5" color="error" gutterBottom>
            BOM not found, please create BOM first.
          </Typography>
          <Button variant="contained" component={Link} to="/styles">
            Go to Styles
          </Button>
        </>
      ) : (
        <Box sx={{ p: 2 }}>
          {/* Top Control Bar */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            sx={{ mb: 2 }}
          >
            <TextField
              size="small"
              placeholder="Search by Type, Supplier, Material"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1, maxWidth: 400 }}
              InputProps={{ sx: { fontSize: 14 } }}
            />

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                component={Link}
                to={`/costings/${styleId}`}
                sx={{ whiteSpace: "nowrap" }}
              >
                Add Costing Consumption
              </Button>

              <Button variant="outlined" color="success" onClick={exportToExcel}>
                Export to Excel
              </Button>

              <PDFDownloadLink
                document={<BOMDetailsPDF groupedBOM={groupedBOM} />}
                fileName="bom-details.pdf"
                style={{ textDecoration: "none" }}
              >
                {({ loading }) => (
                  <Button variant="outlined" color="primary" disabled={loading}>
                    {loading ? "Generating PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </Stack>
          </Stack>

          {/* Accordions */}
          {Object.entries(filteredBOM).map(([type, items]) =>
            items.length ? (
              <Accordion key={type} defaultExpanded sx={{ mb: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: typeColors[type] || "#eee",
                    minHeight: "32px",
                    "& .MuiAccordionSummary-content": { margin: "4px 0" },
                    "& .MuiAccordionSummary-expandIconWrapper": { marginTop: "-2px" },
                    px: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    {type}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    maxHeight: 300,
                    overflowY: "auto",
                    bgcolor: "#fafafa",
                    p: 0,
                  }}
                >
                  <Box sx={{ width: "100%", px: 1 }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#90a4ae" }}>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Supplier</TableCell>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Article</TableCell>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Placement</TableCell>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Colors</TableCell>
                          <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Widths</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {items.map((item, index) => (
                          <TableRow key={index} hover>
                            <TableCell sx={{ textAlign: "center" }}>{item.SupplierName}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{item.Article}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{item.Placement}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{item.Color.join(", ")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{item.Width.join(", ")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ) : null
          )}
        </Box>
      )}
    </>
  );
};

export default BOMDetails;
