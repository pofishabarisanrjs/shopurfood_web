import React, { useState, useEffect, useCallback } from 'react';
import { Box, CssBaseline, Theme, SxProps } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavBar from '../NavBar';
import { useSnackbar } from '../../context/SnackbarContext';

// Extracted styles
const mainBoxStyles: SxProps<Theme> = {
  display: 'flex',
  minHeight: '100vh',
};

const mainContentStyles = (drawerOpen: boolean): SxProps<Theme> => ({
  flexGrow: 1,
  p: 3,
  backgroundColor: '#F8F9FA',
  marginLeft: drawerOpen ? '240px' : 0,
  marginTop: '64px',
  transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  minHeight: 'calc(100vh - 64px)',
  overflow: 'auto',
  '& .MuiPaper-root': {
    borderRadius: 1,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
  },
});

const Layout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    showSnackbar('Logged in successfully', 'success');
  }, [showSnackbar]);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  return (
    <Box sx={mainBoxStyles}>
      <CssBaseline />
      <NavBar onDrawerToggle={handleDrawerToggle} />
      <Sidebar open={drawerOpen} />
      <Box
        component="main"
        sx={mainContentStyles(drawerOpen)}
      >
        {/* <Box className="success-alert">
          Logged Successfully
        </Box> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default React.memo(Layout); 