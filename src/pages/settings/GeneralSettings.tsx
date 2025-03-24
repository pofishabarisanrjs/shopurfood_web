import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useSnackbar } from '../../context/SnackbarContext';

const GeneralSettings: React.FC = () => {
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    showSnackbar('Settings updated successfully', 'success');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#2F3349' }}>
        General Settings
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Site Name"
              name="siteName"
              variant="outlined"
              defaultValue="ShopUp Food"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Site Title"
              name="siteTitle"
              variant="outlined"
              defaultValue="Multi-vendor Food Delivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Admin Email"
              name="adminEmail"
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Phone"
              name="phone"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Site Description"
              name="description"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={2}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#FF5722',
                '&:hover': {
                  backgroundColor: '#f4511e',
                },
              }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default GeneralSettings; 