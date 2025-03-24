import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  MenuItem, 
  Box,
  Select,
  SelectChangeEvent,
  FormControl,
  Badge
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/authActions'

interface NavBarProps {
  onDrawerToggle: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
    navigate('/login');
  };
  
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: '#333',
        boxShadow: 'none',
        borderBottom: '1px solid #eee'
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src="https://shopurfood.trymydemo.com/public/uploads/logo/admin_1081671236.png" 
            alt="ShopUp Food" 
            style={{ height: '40px', marginRight: '10px' }}
          />
        
        </Box>

        {/* Right side items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Language selector */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              variant="outlined"
              sx={{ 
                height: '35px',
                backgroundColor: '#f5f5f5',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
          </FormControl>

          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={670} color="error" max={999}>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleMenu}
              sx={{ 
                borderRadius: 1,
                backgroundColor: '#f5f5f5',
                padding: '8px',
                '&:hover': {
                  backgroundColor: '#e0e0e0'
                }
              }}
            >
              <Typography variant="body2" sx={{ mr: 1, color: '#666' }}>
                admin admin
              </Typography>
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>My Profile</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Change Password</MenuItem>
              <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
