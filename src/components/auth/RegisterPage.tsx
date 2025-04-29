import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  userType: Yup.string().required('User type is required'),
  inviteCode: Yup.string().when('userType', {
    is: 'client',
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.required('Invite code is required for advisers'),
  }),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [userType, setUserType] = useState<'client' | 'adviser'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'client',
      inviteCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Replace with actual API call
        console.log('Registration values:', values);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', values.userType);
        navigate('/');
      } catch (err) {
        setError('An error occurred during registration');
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
                Join Our Platform
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Create your mortgage portal account
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Get started with your mortgage journey today. Access our comprehensive tools and services.
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Secure, fast, and easy to use.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right side - Registration Form */}
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
                    Create Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fill in your details to get started
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="userType-label">Account Type</InputLabel>
                        <Select
                          labelId="userType-label"
                          id="userType"
                          name="userType"
                          value={formik.values.userType}
                          label="Account Type"
                          onChange={(e) => {
                            setUserType(e.target.value as 'client' | 'adviser');
                            formik.handleChange(e);
                          }}
                          startAdornment={
                            <InputAdornment position="start">
                              <BadgeIcon color="primary" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="client">Client</MenuItem>
                          <MenuItem value="adviser">Adviser</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {userType === 'adviser' && (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="inviteCode"
                          name="inviteCode"
                          label="Invite Code"
                          value={formik.values.inviteCode}
                          onChange={formik.handleChange}
                          error={formik.touched.inviteCode && Boolean(formik.errors.inviteCode)}
                          helperText={formik.touched.inviteCode && formik.errors.inviteCode}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="primary" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

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
                    Create Account
                  </Button>

                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate('/login')}
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage; 