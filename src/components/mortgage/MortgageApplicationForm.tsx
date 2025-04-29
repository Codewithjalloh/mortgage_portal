import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  employmentStatus: Yup.string().required('Employment status is required'),
  annualIncome: Yup.number()
    .required('Annual income is required')
    .min(0, 'Annual income must be positive'),
  loanAmount: Yup.number()
    .required('Loan amount is required')
    .min(0, 'Loan amount must be positive'),
  propertyType: Yup.string().required('Property type is required'),
});

const MortgageApplicationForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employmentStatus: '',
      annualIncome: '',
      loanAmount: '',
      propertyType: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Mortgage Application
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default MortgageApplicationForm; 