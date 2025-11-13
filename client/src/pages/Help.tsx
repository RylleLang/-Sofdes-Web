import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Help: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Help
        </Typography>
        <Typography variant="body1">
          Help documentation will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Help;
