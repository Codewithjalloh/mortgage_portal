import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from '@mui/material';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyLocation: string;
  estimatedValue: string;
  depositAmount: string;
  annualIncome: string;
  employmentStatus: string;
  additionalNotes: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  propertyType: Yup.string().required('Property type is required'),
  propertyLocation: Yup.string().required('Property location is required'),
  estimatedValue: Yup.number()
    .required('Estimated value is required')
    .positive('Value must be positive'),
  depositAmount: Yup.number()
    .required('Deposit amount is required')
    .positive('Amount must be positive'),
  annualIncome: Yup.number()
    .required('Annual income is required')
    .positive('Income must be positive'),
  employmentStatus: Yup.string().required('Employment status is required'),
  additionalNotes: Yup.string(),
});

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  propertyType: '',
  propertyLocation: '',
  estimatedValue: '',
  depositAmount: '',
  annualIncome: '',
  employmentStatus: '',
  additionalNotes: '',
};

const MortgageEnquiryForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    try {
      // In a real application, this would be an API call
      console.log('Enquiry submitted:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to create case with pre-filled information
      navigate('/client/create-case', { state: { enquiryData: values } });
    } catch (err) {
      setError('Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        New Mortgage Enquiry
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Property Requirements
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={touched.propertyType && !!errors.propertyType}>
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      name="propertyType"
                      value={values.propertyType}
                      onChange={handleChange}
                      label="Property Type"
                    >
                      <MenuItem value="house">House</MenuItem>
                      <MenuItem value="flat">Flat</MenuItem>
                      <MenuItem value="bungalow">Bungalow</MenuItem>
                      <MenuItem value="maisonette">Maisonette</MenuItem>
                    </Select>
                    {touched.propertyType && errors.propertyType && (
                      <Typography color="error" variant="caption">
                        {errors.propertyType}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="propertyLocation"
                    label="Property Location (City/Area)"
                    value={values.propertyLocation}
                    onChange={handleChange}
                    error={touched.propertyLocation && !!errors.propertyLocation}
                    helperText={touched.propertyLocation && errors.propertyLocation}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="estimatedValue"
                    label="Estimated Property Value"
                    type="number"
                    value={values.estimatedValue}
                    onChange={handleChange}
                    error={touched.estimatedValue && !!errors.estimatedValue}
                    helperText={touched.estimatedValue && errors.estimatedValue}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="depositAmount"
                    label="Available Deposit"
                    type="number"
                    value={values.depositAmount}
                    onChange={handleChange}
                    error={touched.depositAmount && !!errors.depositAmount}
                    helperText={touched.depositAmount && errors.depositAmount}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Financial Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={touched.employmentStatus && !!errors.employmentStatus}>
                    <InputLabel>Employment Status</InputLabel>
                    <Select
                      name="employmentStatus"
                      value={values.employmentStatus}
                      onChange={handleChange}
                      label="Employment Status"
                    >
                      <MenuItem value="employed">Employed</MenuItem>
                      <MenuItem value="self_employed">Self Employed</MenuItem>
                      <MenuItem value="contractor">Contractor</MenuItem>
                      <MenuItem value="retired">Retired</MenuItem>
                    </Select>
                    {touched.employmentStatus && errors.employmentStatus && (
                      <Typography color="error" variant="caption">
                        {errors.employmentStatus}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="annualIncome"
                    label="Annual Income"
                    type="number"
                    value={values.annualIncome}
                    onChange={handleChange}
                    error={touched.annualIncome && !!errors.annualIncome}
                    helperText={touched.annualIncome && errors.annualIncome}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="additionalNotes"
                    label="Additional Notes"
                    value={values.additionalNotes}
                    onChange={handleChange}
                    error={touched.additionalNotes && !!errors.additionalNotes}
                    helperText={touched.additionalNotes && errors.additionalNotes}
                    multiline
                    rows={3}
                  />
                </Grid>

                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/client')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Submit Enquiry
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default MortgageEnquiryForm; 