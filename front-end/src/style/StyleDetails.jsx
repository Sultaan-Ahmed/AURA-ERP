import React from "react";
import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Stack,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function StyleDetails() {
  const { styleId } = useParams();
  const StylesInfo = useSelector((state) => state.style);
  const RangeInfo = useSelector((state) => state.range);
  const StyleDetails = StylesInfo.styles.find((item) => item._id === styleId);
  const RangeDetails = RangeInfo.ranges.find(
    (item) => item._id === StyleDetails.RangeId
  );
  const boms = useSelector((state) => state.boms);
  const BOMDetail = boms?.boms.find((item) => item.StyleId === styleId);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const theme = useTheme();

  return (
    <Box m={isNonMobile ? 4 : 2}>
      <Paper
        elevation={4}
        sx={{ p: isNonMobile ? 4 : 2, borderRadius: 3, mb: 4 }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Style: {StyleDetails.StyleName}
        </Typography>

        {BOMDetail ? (
          <Button variant="contained" LinkComponent={Link} to={`/bom/${StyleDetails._id}`}>View BOM</Button>
        ) : (
         
            <Button LinkComponent={Link} variant="contained" to={`/bom/${StyleDetails._id}/add`}>Add BOM</Button>
         
        )}

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">
              Range Name:
            </Typography>
            <Button LinkComponent={Link} variant="contained" to={`/range/${StyleDetails.RangeId}`}>
              {RangeDetails.name}
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">
              Total Order Qty:
            </Typography>
            <Typography>{StyleDetails.TotalOrderQty}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">
              Order Live Date:
            </Typography>
            <Typography>{StyleDetails.OrderLiveDate}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">
              Ex FTY Date:
            </Typography>
            <Typography>{StyleDetails.ExFtyDate}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* <Paper elevation={3} sx={{ p: isNonMobile ? 3 : 2, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Colors
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {StyleDetails.ColorWiseQty.map((color, index) => (
            <Chip key={index} label={color.Color} color="primary" />
          ))}
        </Stack>
      </Paper> */}

      <Paper elevation={3} sx={{ p: isNonMobile ? 3 : 2, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Color-wise Quantities
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {StyleDetails.ColorWiseQty.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" color="text.primary">
                  Color: {item.Color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.ColorOrderQty}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

export default StyleDetails;
