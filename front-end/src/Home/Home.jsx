import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const HomePage = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom color="primary.main">
          Welcome to AURA ERP
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Streamline your production, materials, and workflow – all in one system.
        </Typography>

        <Grid container spacing={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DashboardIcon />}
              size="large"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ViewModuleIcon />}
              size="large"
              onClick={() => window.location.href = '/modules'}
            >
              View Modules
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HomePage;
