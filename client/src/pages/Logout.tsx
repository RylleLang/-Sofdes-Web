import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Logout: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Logout
        </Typography>
        <Typography variant="body1">
          Logout functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Logout;
