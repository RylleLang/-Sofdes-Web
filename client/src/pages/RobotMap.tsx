import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const RobotMap: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Robot Map
        </Typography>
        <Typography variant="body1">
          Robot map functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default RobotMap;
