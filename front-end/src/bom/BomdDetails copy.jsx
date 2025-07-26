import React, { useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Stack,
  Paper,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
// import data from "../assets/data.json";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const BOMDetails = () => {
  const boms = useSelector((state) => state.boms);
  const { styleId } = useParams();

  const BOMDetail = boms?.boms.find((item) => item.StyleId === styleId);

  // const BOMDetails = data.BOMDetails;
  const containerRef = useRef();

  const groupedBOM = BOMDetail?.BOMDetails?.reduce((acc, item) => {
    acc[item.Type] = acc[item.Type] || [];
    acc[item.Type].push(item);
    return acc;
  }, {});

  const exportToPDF = async () => {
    const exportButton = document.getElementById("export-btn");
    const exportExcelBtn = document.getElementById("export-excel-btn");
    exportButton.style.display = "none"; // Hide button
    exportExcelBtn.style.display = "none"; //hide button

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait a moment
    const input = containerRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("bom-details.pdf");
    exportButton.style.display = "inline-flex"; // Restore button
  };

  const exportToExcel = () => {
    const dataForExcel = [
      ["Type", "Supplier", "Article", "Placement", "Color", "Width"],
      ...BOMDetails.map((item) => [
        item.Type,
        item.SupplierName,
        item.Article,
        item.Placement,
        item.Color.join("\n"),
        item.Width.join("\n"),
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(dataForExcel);

    // Apply vertical wrap and bold header
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

  return (
    <>
      {BOMDetail === undefined ? (
        <>
          <h1>BOM not found, please BOM create first.</h1>
          <Link to={"/styles"}>Go to Styles</Link>
        </>
      ) : (
        <Box sx={{ p: 2 }} ref={containerRef}>
          {Object?.entries(groupedBOM)?.map(([type, items]) => (
            <Accordion key={type} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{type}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {/* Table header */}
                  <Paper
                    variant="outlined"
                    sx={{ p: 1, bgcolor: "#f5f5f5", fontWeight: "bold" }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        Supplier
                      </Grid>
                      <Grid item xs={2}>
                        Article
                      </Grid>
                      <Grid item xs={2}>
                        Placement
                      </Grid>
                      <Grid item xs={3}>
                        Color
                      </Grid>
                      <Grid item xs={3}>
                        Width
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Each item */}
                  {items.map((item, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 1 }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Box sx={{ flex: 1, minWidth: 100 }}>
                          <Typography>{item.SupplierName}</Typography>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 100 }}>
                          <Typography>{item.Article}</Typography>
                        </Box>
                        <Box sx={{ flex: 2, minWidth: 120 }}>
                          <Typography>{item.Placement}</Typography>
                        </Box>
                        <Box sx={{ flex: 2, minWidth: 120 }}>
                          {item.Color.map((color, i) => (
                            <Typography key={i} variant="body2">
                              {color}
                            </Typography>
                          ))}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 80 }}>
                          {item.Width.map((width, i) => (
                            <Typography key={i} variant="body2">
                              {width}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Export Buttons */}
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={exportToPDF}
              id="export-btn"
            >
              Export to PDF
            </Button>
            <Button
              id="export-excel-btn"
              variant="outlined"
              color="success"
              onClick={exportToExcel}
            >
              Export to Excel
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BOMDetails;
