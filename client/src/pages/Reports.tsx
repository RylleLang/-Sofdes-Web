import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Reports: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Typography variant="body1">
          Reports functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Reports;
