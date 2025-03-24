// src/components/auth/Login.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, TextField, Button, Typography, Container, Paper, Link, Alert, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginBg from '../../assets/images/login_bg1.png';
import colors from '../../constants/colors';
import { loginRequest } from '../../store/actions/authActions';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state: any) => state.auth.error);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(email, password));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: colors.primary,
      }}
    >
      <Container maxWidth="lg">
        <Box component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Grid container>
            <Grid item xs={12} md={6} sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, bgcolor: colors.white,
            }}>
              <Box component="img" src={loginBg} alt="Food Delivery" sx={{
                width: '100%', height: 'auto', maxWidth: '400px',
              }} />
            </Grid>

            <Grid item xs={12} md={6} sx={{
              p: 4, display: 'flex', flexDirection: 'column', bgcolor: colors.white,
            }}>
              <Typography component="h1" variant="h4" sx={{
                mb: 1, fontWeight: 'bold', position: 'relative', '&::after': {
                  content: '""', position: 'absolute', bottom: -5, left: 0, width: '20%', height: '4px',
                  backgroundColor: colors.underline, borderRadius: '3px',
                },
              }}>
                Welcome to Shop Ur Food
              </Typography>

              <Typography variant="h6" sx={{ my: 1, color: colors.primary }}>
                LOGIN
              </Typography>

              {authError && <Alert severity="error" sx={{ mb: 3 }}>{authError}</Alert>}

              <Alert severity="info" sx={{ mb: 3 }}>
                Please Login to Continue
              </Alert>

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2, mb: 2, bgcolor: colors.primary, '&:hover': {
                        bgcolor: colors.primaryHover,
                      }, borderRadius: '25px', py: 1.5, width: '50%',
                    }}
                  >
                    LOGIN
                  </Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      color: colors.textLight, textDecoration: 'none', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 0.5,
                    }}
                  >
                    <span role="img" aria-label="lock">🔒</span>
                    Forgot Password?
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;