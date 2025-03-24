import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SubAdmin: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Sub Admin Management
      </Typography>
      <Box>
        Sub Admin content goes here
      </Box>
    </Paper>
  );
};

export default SubAdmin; 