import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  Avatar,
  Stack,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RangeDetails = () => {
  const navigate = useNavigate();
  const { rangeId } = useParams();
  const StylesInfo = useSelector((state) => state.style);
  const RangeInfo = useSelector((state) => state.range);
  const RangeDetails = RangeInfo.ranges.find((item) => item._id === rangeId);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();

  const handleStyleClick = (style) => {
    navigate(`/styles/${style._id}`);
  };

  return (
    <Box m={isNonMobile ? '30px' : '15px'}>
      <Card
        sx={{
          p: isNonMobile ? 4 : 2,
          borderRadius: 4,
          boxShadow: 6,
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <StorefrontIcon />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {RangeDetails?.name}
            </Typography>
          </Stack>

          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Range ID:</strong> {RangeDetails._id}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Customer Name:</strong> {RangeDetails?.CustomerName}
              </Typography>
            </Grid>

             <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Current Stage:</strong> {RangeDetails?.CurrentStage}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Vendors:</strong>{' '}
                {RangeDetails.VendorName.length
                  ? RangeDetails.VendorName.join(', ')
                  : 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" fontWeight="medium" gutterBottom>
            Associated Styles:
          </Typography>

          <Grid container spacing={2}>
            {RangeDetails.styles.map((styleId) => {
              const style = StylesInfo.styles.find((s) => s._id === styleId);
              if (!style) return null;

              return (
                <Grid item xs={12} key={styleId}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {style.StyleName}
                      </Typography>
                      <Button
                        onClick={() => handleStyleClick(style)}
                        size="small"
                        variant="outlined"
                      >
                        View Details
                      </Button>
                    </Box>

                    <Grid container spacing={1}>
                      {style?.ColorWiseQty?.map((colorObj, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                          <Chip
                            label={`Color :${colorObj.Color} - Qty: ${colorObj.ColorOrderQty} pcs`}
                            color="secondary"
                            variant="outlined"
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                      )) || (
                        <Typography variant="body2" color="text.secondary">
                          No color info available.
                        </Typography>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RangeDetails;
