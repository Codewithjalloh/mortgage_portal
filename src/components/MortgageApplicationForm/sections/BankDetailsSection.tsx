import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { BankDetails } from '../../../types/MortgageApplication';

interface BankDetailsSectionProps {
  data: BankDetails;
  onChange: (data: BankDetails) => void;
}

const BankDetailsSection: React.FC<BankDetailsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof BankDetails, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const formatSortCode = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as XX-XX-XX
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
  };

  const handleSortCodeChange = (value: string) => {
    const formattedValue = formatSortCode(value);
    if (formattedValue.length <= 8) { // XX-XX-XX = 8 characters
      handleChange('sortCode', formattedValue);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Bank Details
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Please provide your bank details for mortgage payments
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Holder Name"
                value={data.accountHolder}
                onChange={(e) => handleChange('accountHolder', e.target.value)}
                required
                helperText="Name as it appears on your bank account"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sort Code"
                value={data.sortCode}
                onChange={(e) => handleSortCodeChange(e.target.value)}
                required
                placeholder="XX-XX-XX"
                inputProps={{ maxLength: 8 }}
                helperText="Enter your 6-digit sort code"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={data.accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 8) {
                    handleChange('accountNumber', value);
                  }
                }}
                required
                inputProps={{ maxLength: 8 }}
                helperText="Enter your 8-digit account number"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                value={data.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                required
                helperText="Name of your bank"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BankDetailsSection; 