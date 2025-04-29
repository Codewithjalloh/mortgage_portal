import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
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
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  FormControlLabel,
  Switch,
  Snackbar,
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Home as HomeIcon, Person as PersonIcon, Work as WorkIcon, AccountBalance as BankIcon, Description as DocumentIcon } from '@mui/icons-material';

interface Loan {
  type: string;
  amount: string;
  monthlyPayment: string;
  remainingTerm: string;
}

interface CreditCard {
  provider: string;
  limit: string;
  balance: string;
  monthlyPayment: string;
}

interface AdditionalApplicant {
  name: string;
  email: string;
  employmentStatus?: string;
  annualIncome?: string;
  creditScore?: string;
  baseSalary?: string;
  bonus?: string;
  overtime?: string;
  otherIncome?: string;
  loans: Loan[];
  overdraft?: string;
  creditCards: CreditCard[];
  otherLiabilities?: string;
}

interface Document {
  id: string;
  type: string;
  name: string;
  file: File | null;
  uploadDate?: string;
  status: 'pending' | 'uploaded' | 'error';
}

interface FormData {
  caseType: string;
  propertyType: string;
  propertyValue: string;
  loanAmount: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  employmentType: string;
  employerName: string;
  employmentLength: string;
  annualIncome: string;
  additionalIncome: string;
  depositAmount: string;
  creditScore: string;
  existingMortgage: {
    hasExistingMortgage: boolean;
    currentLender: string;
  };
}

interface AdditionalApplicantErrors {
  name?: string;
  email?: string;
  employmentStatus?: string;
  annualIncome?: string;
  creditScore?: string;
  baseSalary?: string;
  bonus?: string;
  overtime?: string;
  otherIncome?: string;
  loans?: Array<{
    type?: string;
    amount?: string;
    monthlyPayment?: string;
    remainingTerm?: string;
  }>;
  overdraft?: string;
  creditCards?: Array<{
    provider?: string;
    limit?: string;
    balance?: string;
    monthlyPayment?: string;
  }>;
  otherLiabilities?: string;
}

const validationSchema = Yup.object({
  caseType: Yup.string().required('Case type is required'),
  description: Yup.string().required('Description is required'),
  propertyType: Yup.string().required('Property type is required'),
  estimatedValue: Yup.number()
    .required('Estimated value is required')
    .positive('Value must be positive'),
  loanAmount: Yup.number()
    .required('Loan amount is required')
    .positive('Amount must be positive'),
  employmentStatus: Yup.string().required('Employment status is required'),
  annualIncome: Yup.number()
    .required('Annual income is required')
    .positive('Income must be positive'),
  depositAmount: Yup.number()
    .required('Deposit amount is required')
    .positive('Deposit must be positive'),
  propertyAddress: Yup.string().required('Property address is required'),
  propertyPostcode: Yup.string()
    .required('Postcode is required')
    .matches(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i, 'Invalid UK postcode'),
  termLength: Yup.string().required('Term length is required'),
  interestRateType: Yup.string().required('Interest rate type is required'),
  creditScore: Yup.number()
    .required('Credit score is required')
    .min(300, 'Credit score must be at least 300')
    .max(850, 'Credit score must not exceed 850'),
  existingMortgage: Yup.object({
    hasExistingMortgage: Yup.boolean(),
    currentLender: Yup.string().when('hasExistingMortgage', (hasExistingMortgage, schema) => {
      return hasExistingMortgage ? schema.required('Current lender is required') : schema;
    }),
    currentBalance: Yup.number().when('hasExistingMortgage', (hasExistingMortgage, schema) => {
      return hasExistingMortgage ? schema.required('Current balance is required').positive('Balance must be positive') : schema;
    }),
    currentRate: Yup.number().when('hasExistingMortgage', (hasExistingMortgage, schema) => {
      return hasExistingMortgage ? schema.required('Current rate is required').positive('Rate must be positive') : schema;
    }),
    currentTerm: Yup.string().when('hasExistingMortgage', (hasExistingMortgage, schema) => {
      return hasExistingMortgage ? schema.required('Current term is required') : schema;
    }),
  }),
  baseSalary: Yup.number()
    .required('Base salary is required')
    .positive('Amount must be positive'),
  bonus: Yup.number()
    .min(0, 'Amount cannot be negative'),
  overtime: Yup.number()
    .min(0, 'Amount cannot be negative'),
  otherIncome: Yup.number()
    .min(0, 'Amount cannot be negative'),
  loans: Yup.array().of(
    Yup.object({
      type: Yup.string().required('Loan type is required'),
      amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be positive'),
      monthlyPayment: Yup.number()
        .required('Monthly payment is required')
        .positive('Amount must be positive'),
      remainingTerm: Yup.string().required('Remaining term is required'),
    })
  ),
  overdraft: Yup.number()
    .min(0, 'Amount cannot be negative'),
  creditCards: Yup.array().of(
    Yup.object({
      provider: Yup.string().required('Provider is required'),
      limit: Yup.number()
        .required('Limit is required')
        .positive('Amount must be positive'),
      balance: Yup.number()
        .required('Balance is required')
        .min(0, 'Amount cannot be negative'),
      monthlyPayment: Yup.number()
        .required('Monthly payment is required')
        .positive('Amount must be positive'),
    })
  ),
  otherLiabilities: Yup.string(),
  additionalApplicants: Yup.array().of(
    Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      employmentStatus: Yup.string().required('Employment status is required'),
      annualIncome: Yup.number()
        .required('Annual income is required')
        .positive('Income must be positive'),
      creditScore: Yup.number()
        .required('Credit score is required')
        .min(300, 'Credit score must be at least 300')
        .max(850, 'Credit score must not exceed 850'),
      baseSalary: Yup.number()
        .required('Base salary is required')
        .positive('Amount must be positive'),
      bonus: Yup.number()
        .min(0, 'Amount cannot be negative'),
      overtime: Yup.number()
        .min(0, 'Amount cannot be negative'),
      otherIncome: Yup.number()
        .min(0, 'Amount cannot be negative'),
      loans: Yup.array().of(
        Yup.object({
          type: Yup.string().required('Loan type is required'),
          amount: Yup.number()
            .required('Amount is required')
            .positive('Amount must be positive'),
          monthlyPayment: Yup.number()
            .required('Monthly payment is required')
            .positive('Amount must be positive'),
          remainingTerm: Yup.string().required('Remaining term is required'),
        })
      ),
      overdraft: Yup.number()
        .min(0, 'Amount cannot be negative'),
      creditCards: Yup.array().of(
        Yup.object({
          provider: Yup.string().required('Provider is required'),
          limit: Yup.number()
            .required('Limit is required')
            .positive('Amount must be positive'),
          balance: Yup.number()
            .required('Balance is required')
            .min(0, 'Amount cannot be negative'),
          monthlyPayment: Yup.number()
            .required('Monthly payment is required')
            .positive('Amount must be positive'),
        })
      ),
      otherLiabilities: Yup.string(),
    })
  ),
});

const documentTypes = [
  { value: 'id_proof', label: 'ID Proof (Passport/Driving License)' },
  { value: 'address_proof', label: 'Proof of Address' },
  { value: 'bank_statements', label: 'Bank Statements (3 months)' },
  { value: 'payslips', label: 'Payslips (3 months)' },
  { value: 'tax_returns', label: 'Tax Returns (if self-employed)' },
  { value: 'p60', label: 'P60' },
  { value: 'property_valuation', label: 'Property Valuation Report' },
  { value: 'insurance_documents', label: 'Insurance Documents' },
  { value: 'other', label: 'Other Documents' },
];

const initialFormData: FormData = {
  caseType: '',
  propertyType: '',
  propertyValue: '',
  loanAmount: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  employmentType: '',
  employerName: '',
  employmentLength: '',
  annualIncome: '',
  additionalIncome: '',
  depositAmount: '',
  creditScore: '',
  existingMortgage: {
    hasExistingMortgage: false,
    currentLender: '',
  },
};

const steps = [
  { label: 'Case Type', icon: <HomeIcon /> },
  { label: 'Personal Details', icon: <PersonIcon /> },
  { label: 'Employment', icon: <WorkIcon /> },
  { label: 'Financial Information', icon: <BankIcon /> },
  { label: 'Documents', icon: <DocumentIcon /> },
];

const CreateCase: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNext = (): void => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // In a real application, this would be an API call
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to cases list on success
      navigate('/client/cases');
      setShowSuccess(true);
    } catch (err) {
      console.error('Failed to create case. Please try again.', err);
    }
  };

  const handleTextChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSelectChange = (field: keyof FormData) => (
    event: SelectChangeEvent
  ): void => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleExistingMortgageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      existingMortgage: {
        ...formData.existingMortgage,
        hasExistingMortgage: event.target.checked,
      },
    });
  };

  const handleExistingMortgageDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      existingMortgage: {
        ...formData.existingMortgage,
        currentLender: event.target.value,
      },
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                What type of mortgage are you looking for?
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Case Type</InputLabel>
                <Select
                  value={formData.caseType}
                  onChange={handleSelectChange('caseType')}
                  label="Case Type"
                >
                  <MenuItem value="firstTimeBuyer">First Time Buyer</MenuItem>
                  <MenuItem value="remortgage">Remortgage</MenuItem>
                  <MenuItem value="buyToLet">Buy to Let</MenuItem>
                  <MenuItem value="equityRelease">Equity Release</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={formData.propertyType}
                  onChange={handleSelectChange('propertyType')}
                  label="Property Type"
                >
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="flat">Flat</MenuItem>
                  <MenuItem value="bungalow">Bungalow</MenuItem>
                  <MenuItem value="maisonette">Maisonette</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Property Value"
                value={formData.propertyValue}
                onChange={handleTextChange('propertyValue')}
                InputProps={{
                  startAdornment: '£',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                value={formData.loanAmount}
                onChange={handleTextChange('loanAmount')}
                InputProps={{
                  startAdornment: '£',
                }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Your Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleTextChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleTextChange('lastName')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleTextChange('email')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={handleTextChange('phone')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleTextChange('dateOfBirth')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Employment Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  value={formData.employmentType}
                  onChange={handleSelectChange('employmentType')}
                  label="Employment Type"
                >
                  <MenuItem value="fullTime">Full Time</MenuItem>
                  <MenuItem value="partTime">Part Time</MenuItem>
                  <MenuItem value="selfEmployed">Self Employed</MenuItem>
                  <MenuItem value="contractor">Contractor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Employer Name"
                value={formData.employerName}
                onChange={handleTextChange('employerName')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Length of Employment"
                value={formData.employmentLength}
                onChange={handleTextChange('employmentLength')}
                helperText="e.g., 2 years 6 months"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Annual Income"
                value={formData.annualIncome}
                onChange={handleTextChange('annualIncome')}
                InputProps={{
                  startAdornment: '£',
                }}
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Financial Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Additional Income"
                value={formData.additionalIncome}
                onChange={handleTextChange('additionalIncome')}
                InputProps={{
                  startAdornment: '£',
                }}
                helperText="e.g., rental income, investments"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Deposit Amount"
                value={formData.depositAmount}
                onChange={handleTextChange('depositAmount')}
                InputProps={{
                  startAdornment: '£',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Credit Score"
                value={formData.creditScore}
                onChange={handleTextChange('creditScore')}
                helperText="If known (optional)"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.existingMortgage.hasExistingMortgage}
                    onChange={handleExistingMortgageChange}
                  />
                }
                label="I have an existing mortgage"
              />
            </Grid>
            {formData.existingMortgage.hasExistingMortgage && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Existing Mortgage Details"
                  value={formData.existingMortgage.currentLender}
                  onChange={handleExistingMortgageDetailsChange}
                  multiline
                  rows={3}
                />
              </Grid>
            )}
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Required Documents
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please prepare the following documents for your application:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="subtitle1" color="primary">
                      Identity Documents
                    </Typography>
                    <Typography variant="body2">
                      • Passport or driving license
                      <br />
                      • Recent utility bill (within last 3 months)
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="subtitle1" color="primary">
                      Financial Documents
                    </Typography>
                    <Typography variant="body2">
                      • Last 3 months bank statements
                      <br />
                      • Last 3 months payslips
                      <br />
                      • P60 or tax return (if self-employed)
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="subtitle1" color="primary">
                      Property Documents
                    </Typography>
                    <Typography variant="body2">
                      • Property details
                      <br />
                      • Current mortgage statement (if applicable)
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your case has been created successfully! Redirecting to cases page...
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Case
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please fill out the following information to create your mortgage case.
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCase; 