import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  Link,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Dummy credentials for testing
        const testAccounts = {
          client: {
            email: 'client@example.com',
            password: 'client123',
            type: 'client'
          },
          adviser: {
            email: 'adviser@example.com',
            password: 'adviser123',
            type: 'adviser'
          },
          admin: {
            email: 'admin@example.com',
            password: 'admin123',
            type: 'admin'
          }
        };

        const account = Object.values(testAccounts).find(
          acc => acc.email === values.email && acc.password === values.password
        );

        if (account) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userType', account.type);
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      } catch (err) {
        setError('An error occurred during login');
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* Left side - Branding and Info */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ color: 'white', textAlign: 'center', p: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome Back
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Access your mortgage portal account
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Manage your mortgage applications, track progress, and stay updated with your financial journey.
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Secure, fast, and easy to use.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right side - Login Form */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={8} 
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                maxWidth: 480,
                mx: 'auto',
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Sign In
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter your credentials to access your account
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ 
                      mt: 3, 
                      mb: 2,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                    }}
                  >
                    Sign In
                  </Button>

                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate('/register')}
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Don't have an account? Register here
                    </Link>
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Link
                      href="#"
                      variant="body2"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>
                </form>

                {!isMobile && (
                  <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2" gutterBottom color="text.secondary">
                      Test Accounts:
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Client:</strong>
                          <br />
                          client@example.com
                          <br />
                          client123
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Adviser:</strong>
                          <br />
                          adviser@example.com
                          <br />
                          adviser123
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Admin:</strong>
                          <br />
                          admin@example.com
                          <br />
                          admin123
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage; 