import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Monitoring: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Monitoring
        </Typography>
        <Typography variant="body1">
          Monitoring functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Monitoring;
