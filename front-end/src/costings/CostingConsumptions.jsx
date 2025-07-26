import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Paper,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CostingsConsumption = () => {
  const boms = useSelector((state) => state.boms);
  const { styleId } = useParams();
  const BOMDetail = boms?.boms.find((item) => item.StyleId === styleId);

  const [consumptions, setConsumptions] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalWidths, setModalWidths] = useState([]);
  const [modalConsumptions, setModalConsumptions] = useState({});

  // Generate a stable, unique ID based on key fields
  const getGeneratedItemId = (item) => {
    return `${item.SupplierName}-${item.Placement}-${item.Article}`.replace(
      /\s+/g,
      "_"
    );
  };

  const getItemKey = (itemId, color, width) => `${itemId}-${color}-${width}`;

  const groupedBOM = BOMDetail?.BOMDetails.reduce((acc, item) => {
    acc[item.Type] = acc[item.Type] || [];
    acc[item.Type].push(item);
    return acc;
  }, {});

  const handleOpenModal = (item) => {
    const itemId = getGeneratedItemId(item);
    setCurrentItem({ ...item, __genId: itemId });

    const existingWidths = item.Width.filter((width) =>
      item.Color.some((color) => {
        const key = getItemKey(itemId, color, width);
        return consumptions[key] !== undefined && consumptions[key] !== "";
      })
    );

    setModalWidths(existingWidths);

    const prefill = {};
    existingWidths.forEach((width) => {
      const key = getItemKey(itemId, item.Color[0], width);
      prefill[width] = consumptions[key] || "";
    });

    setModalConsumptions(prefill);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentItem(null);
    setModalWidths([]);
    setModalConsumptions({});
  };
  const handleRemoveWidth = (widthToRemove) => {
    setModalWidths((prev) => prev.filter((w) => w !== widthToRemove));

    setModalConsumptions((prev) => {
      const newState = { ...prev };
      delete newState[widthToRemove];
      return newState;
    });
  };

  const handleWidthsChange = (event) => {
    const selected = event.target.value;
    const newConsumptions = { ...modalConsumptions };
    Object.keys(newConsumptions).forEach((w) => {
      if (!selected.includes(w)) delete newConsumptions[w];
    });
    setModalWidths(selected);
    setModalConsumptions(newConsumptions);
  };

  const handleModalConsumptionChange = (width, value) => {
    setModalConsumptions((prev) => ({
      ...prev,
      [width]: value,
    }));
  };

  const handleModalSave = () => {
    if (!currentItem) return;
    const updated = { ...consumptions };
    const itemId = currentItem.__genId;

    modalWidths.forEach((width) => {
      const value = modalConsumptions[width] || "";
      currentItem.Color.forEach((color) => {
        const key = getItemKey(itemId, color, width);
        updated[key] = value;
      });
    });

    setConsumptions(updated);
    handleCloseModal();
  };

  const getTotalConsumption = (item) => {
    const itemId = getGeneratedItemId(item);
    let total = 0;

    item.Color.forEach((color) => {
      item.Width.forEach((width) => {
        const key = getItemKey(itemId, color, width);
        const val = consumptions[key];
        if (val && !isNaN(val)) {
          total += Number(val);
        }
      });
    });

    return total;
  };

  const handleBulkSave = async () => {
    try {
      const updatedBOMDetails = BOMDetail.BOMDetails.map((item) => {
        const itemId = getGeneratedItemId(item);
        const itemCopy = { ...item };
        const itemConsumptions = [];

        item.Color.forEach((color) => {
          item.Width.forEach((width) => {
            const key = getItemKey(itemId, color, width);
            const value = consumptions[key];
            if (value !== undefined && value !== "") {
              itemConsumptions.push({
                color,
                width,
                value: parseFloat(value),
              });
            }
          });
        });

        if (itemConsumptions.length > 0) {
          itemCopy.consumption = itemConsumptions;
        }

        return itemCopy;
      });

      const payload = {
        styleId: BOMDetail.StyleId,
        submittedAt: new Date().toISOString(),
        BOMDetails: updatedBOMDetails,
      };

      await axios.post(`http://localhost:5000/api/v1/costcons`, payload,{
        headers:{
          'Content-Type':'application/json'
        }
      });
      console.log("Consumptions saved:", payload);
      alert("Consumptions saved successfully!");
    } catch (error) {
      console.error("Error saving consumptions:", error);
      alert("Failed to save consumptions.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {Object.entries(groupedBOM || {}).map(([type, items]) => (
        <Accordion key={type} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{type}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Paper
                variant="outlined"
                sx={{ p: 1, bgcolor: "#f5f5f5", fontWeight: "bold" }}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    Supplier
                  </Grid>
                  <Grid item xs={3}>
                    Placement
                  </Grid>
                  <Grid item xs={4}>
                    Article
                  </Grid>
                  <Grid item xs={2} />
                </Grid>
              </Paper>

              {items.map((item) => {
                const itemId = getGeneratedItemId(item);
                const total = getTotalConsumption(item);
                const hasConsumption = total > 0;

                return (
                  <Paper key={itemId} variant="outlined" sx={{ p: 1 }}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <Typography noWrap>{item.SupplierName}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography noWrap>{item.Placement}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography noWrap>{item.Article}</Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenModal(item)}
                        >
                          {hasConsumption
                            ? "Update Consumption"
                            : "Add Consumption"}
                        </Button>
                        {hasConsumption && (
                          <Typography
                            variant="caption"
                            sx={{ mt: 0.5, display: "block", color: "green" }}
                          >
                            Total: {total}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Costed Consumption Entry</DialogTitle>
        <DialogContent dividers>
          {currentItem && (
            <Stack spacing={2}>
              <Typography>
                <strong>Supplier:</strong> {currentItem.SupplierName}
              </Typography>
              <Typography>
                <strong>Placement:</strong> {currentItem.Placement}
              </Typography>
              <Typography>
                <strong>Article:</strong> {currentItem.Article}
              </Typography>

              <FormControl fullWidth size="small">
                <InputLabel>Width</InputLabel>
                <Select
                  multiple
                  value={modalWidths}
                  onChange={handleWidthsChange}
                  input={<OutlinedInput label="Width" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() => handleRemoveWidth(value)}
                          onMouseDown={(e) => e.stopPropagation()} // Prevent dropdown toggle
                        />
                      ))}
                    </Box>
                  )}
                >
                  {currentItem.Width.filter(
                    (w) => !modalWidths.includes(w)
                  ).map((w) => (
                    <MenuItem key={w} value={w}>
                      {w}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {modalWidths.length === 0 ? (
                <Typography color="text.secondary">
                  Please select at least one Width to enter consumption.
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {modalWidths.map((width) => (
                    <TextField
                      key={width}
                      label={`Consumption for Width: ${width} (applies to all colors)`}
                      type="number"
                      value={modalConsumptions[width] || ""}
                      onChange={(e) =>
                        handleModalConsumptionChange(width, e.target.value)
                      }
                      fullWidth
                      inputProps={{ min: 0, step: "any" }}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleModalSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save All */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={handleBulkSave}>
          Save All
        </Button>
      </Box>
    </Box>
  );
};

export default CostingsConsumption;
