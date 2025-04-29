import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreditCommitment } from '../../../types/MortgageApplication';

interface CreditCommitmentsSectionProps {
  data: CreditCommitment[];
  onChange: (data: CreditCommitment[]) => void;
}

const CreditCommitmentsSection: React.FC<CreditCommitmentsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleAddCommitment = () => {
    onChange([
      ...data,
      {
        type: '',
        provider: '',
        accountNumber: '',
        balance: 0,
        monthlyPayment: 0,
        toBeRepaid: false,
      },
    ]);
  };

  const handleRemoveCommitment = (index: number) => {
    const newCommitments = [...data];
    newCommitments.splice(index, 1);
    onChange(newCommitments);
  };

  const handleCommitmentChange = (index: number, field: keyof CreditCommitment, value: any) => {
    const newCommitments = [...data];
    newCommitments[index] = {
      ...newCommitments[index],
      [field]: value,
    };
    onChange(newCommitments);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Credit Commitments
        </Typography>
      </Grid>

      {data.map((commitment, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Credit Commitment {index + 1}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={commitment.type}
                    onChange={(e) => handleCommitmentChange(index, 'type', e.target.value)}
                    label="Type"
                    required
                  >
                    <MenuItem value="credit-card">Credit Card</MenuItem>
                    <MenuItem value="personal-loan">Personal Loan</MenuItem>
                    <MenuItem value="car-loan">Car Loan</MenuItem>
                    <MenuItem value="store-card">Store Card</MenuItem>
                    <MenuItem value="overdraft">Overdraft</MenuItem>
                    <MenuItem value="hire-purchase">Hire Purchase</MenuItem>
                    <MenuItem value="student-loan">Student Loan</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Provider"
                  value={commitment.provider}
                  onChange={(e) => handleCommitmentChange(index, 'provider', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  value={commitment.accountNumber}
                  onChange={(e) => handleCommitmentChange(index, 'accountNumber', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Balance"
                  type="number"
                  value={commitment.balance}
                  onChange={(e) => handleCommitmentChange(index, 'balance', parseFloat(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monthly Payment"
                  type="number"
                  value={commitment.monthlyPayment}
                  onChange={(e) => handleCommitmentChange(index, 'monthlyPayment', parseFloat(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={commitment.toBeRepaid}
                      onChange={(e) => handleCommitmentChange(index, 'toBeRepaid', e.target.checked)}
                    />
                  }
                  label="To be repaid with mortgage proceeds"
                />
              </Grid>

              <Grid item xs={12} sm={1}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => handleRemoveCommitment(index)}
                    color="error"
                    aria-label="remove credit commitment"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCommitment}
            sx={{ minWidth: 200 }}
          >
            Add Credit Commitment
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreditCommitmentsSection; 