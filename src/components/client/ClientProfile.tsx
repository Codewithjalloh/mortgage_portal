import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  Tooltip,
  Switch,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Save as SaveIcon, 
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  postcode: string;
  preferredContactMethod: string;
  preferredAppointmentTime: string;
  marketingPreferences: {
    emailUpdates: boolean;
    smsUpdates: boolean;
    postalUpdates: boolean;
  };
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\s-()]+$/, 'Invalid phone number')
    .required('Phone number is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  address: Yup.string().required('Address is required'),
  postcode: Yup.string()
    .matches(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i, 'Invalid UK postcode')
    .required('Postcode is required'),
  preferredContactMethod: Yup.string().required('Preferred contact method is required'),
  preferredAppointmentTime: Yup.string().required('Preferred appointment time is required'),
});

const initialValues: ProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '07700 900123',
  dateOfBirth: '1990-01-01',
  address: '123 Main Street',
  postcode: 'SW1A 1AA',
  preferredContactMethod: 'email',
  preferredAppointmentTime: 'morning',
  marketingPreferences: {
    emailUpdates: true,
    smsUpdates: false,
    postalUpdates: false,
  },
};

const ClientProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateProfileCompletion = (values: ProfileData) => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'address',
      'postcode',
      'preferredContactMethod',
      'preferredAppointmentTime',
    ];
    
    const completedFields = requiredFields.filter(field => 
      values[field as keyof ProfileData] && values[field as keyof ProfileData].toString().trim() !== ''
    );
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const handleSubmit = async (values: ProfileData) => {
    try {
      // In a real application, this would be an API call
      console.log('Profile updated:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Profile Header Card */}
              <Grid item xs={12}>
                <Card sx={{ 
                  p: 3, 
                  background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                  color: 'white'
                }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar
                          sx={{ 
                            width: 120, 
                            height: 120, 
                            border: '4px solid white',
                            bgcolor: 'white',
                            color: '#1976d2'
                          }}
                          src={profileImage || undefined}
                        >
                          {!profileImage && values.firstName[0] + values.lastName[0]}
                        </Avatar>
                        {isEditing && (
                          <Tooltip title="Change Photo">
                            <IconButton
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                bgcolor: 'white',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                              }}
                              component="label"
                            >
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                              <PhotoCameraIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h4" gutterBottom>
                        {values.firstName} {values.lastName}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                        Client since January 2024
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Profile Completion
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={calculateProfileCompletion(values)}
                          sx={{ 
                            height: 8, 
                            borderRadius: 4, 
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'white',
                            }
                          }}
                        />
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          {calculateProfileCompletion(values)}% Complete
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      {isEditing ? (
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => {
                              resetForm();
                              setIsEditing(false);
                            }}
                            sx={{ bgcolor: 'white', color: '#1976d2' }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => handleSubmit()}
                            sx={{ bgcolor: 'white', color: '#1976d2' }}
                          >
                            Save Changes
                          </Button>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={() => setIsEditing(true)}
                          sx={{ bgcolor: 'white', color: '#1976d2' }}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Personal Information Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                      <PersonIcon color="primary" />
                      <Typography variant="h6">Personal Information</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="firstName"
                          label="First Name"
                          value={values.firstName}
                          onChange={handleChange}
                          error={touched.firstName && !!errors.firstName}
                          helperText={touched.firstName && errors.firstName}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="lastName"
                          label="Last Name"
                          value={values.lastName}
                          onChange={handleChange}
                          error={touched.lastName && !!errors.lastName}
                          helperText={touched.lastName && errors.lastName}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="dateOfBirth"
                          label="Date of Birth"
                          type="date"
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          error={touched.dateOfBirth && !!errors.dateOfBirth}
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                          disabled={!isEditing}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Contact Information Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                      <EmailIcon color="primary" />
                      <Typography variant="h6">Contact Information</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="email"
                          label="Email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                          error={touched.phone && !!errors.phone}
                          helperText={touched.phone && errors.phone}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Address Information Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                      <LocationIcon color="primary" />
                      <Typography variant="h6">Address Information</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="address"
                          label="Address"
                          value={values.address}
                          onChange={handleChange}
                          error={touched.address && !!errors.address}
                          helperText={touched.address && errors.address}
                          disabled={!isEditing}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="postcode"
                          label="Postcode"
                          value={values.postcode}
                          onChange={handleChange}
                          error={touched.postcode && !!errors.postcode}
                          helperText={touched.postcode && errors.postcode}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Preferences Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                      <NotificationsIcon color="primary" />
                      <Typography variant="h6">Preferences</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Preferred Contact Method</InputLabel>
                          <Select
                            name="preferredContactMethod"
                            value={values.preferredContactMethod}
                            onChange={handleChange}
                            label="Preferred Contact Method"
                            disabled={!isEditing}
                          >
                            <MenuItem value="email">Email</MenuItem>
                            <MenuItem value="phone">Phone</MenuItem>
                            <MenuItem value="post">Post</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Preferred Appointment Time</InputLabel>
                          <Select
                            name="preferredAppointmentTime"
                            value={values.preferredAppointmentTime}
                            onChange={handleChange}
                            label="Preferred Appointment Time"
                            disabled={!isEditing}
                          >
                            <MenuItem value="morning">Morning (9am - 12pm)</MenuItem>
                            <MenuItem value="afternoon">Afternoon (12pm - 5pm)</MenuItem>
                            <MenuItem value="evening">Evening (5pm - 8pm)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Marketing Preferences
                        </Typography>
                        <Stack spacing={2}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={values.marketingPreferences.emailUpdates}
                                onChange={handleChange}
                                name="marketingPreferences.emailUpdates"
                                disabled={!isEditing}
                              />
                            }
                            label="Email Updates"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={values.marketingPreferences.smsUpdates}
                                onChange={handleChange}
                                name="marketingPreferences.smsUpdates"
                                disabled={!isEditing}
                              />
                            }
                            label="SMS Updates"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={values.marketingPreferences.postalUpdates}
                                onChange={handleChange}
                                name="marketingPreferences.postalUpdates"
                                disabled={!isEditing}
                              />
                            }
                            label="Postal Updates"
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Profile updated successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientProfile; 