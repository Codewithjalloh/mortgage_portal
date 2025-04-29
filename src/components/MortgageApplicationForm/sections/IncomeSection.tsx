import React from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Income, EmploymentDetail, AdditionalIncome } from '../../../types/MortgageApplication';

interface IncomeSectionProps {
  data: Income;
  onChange: (data: Income) => void;
}

const IncomeSection: React.FC<IncomeSectionProps> = ({
  data,
  onChange,
}) => {
  const handleEmploymentStatusChange = (value: string) => {
    onChange({
      ...data,
      employmentStatus: value,
    });
  };

  const handleAddEmployment = () => {
    onChange({
      ...data,
      employmentDetails: [
        ...data.employmentDetails,
        {
          employerName: '',
          jobTitle: '',
          startDate: '',
          income: 0,
        },
      ],
    });
  };

  const handleRemoveEmployment = (index: number) => {
    const newEmploymentDetails = [...data.employmentDetails];
    newEmploymentDetails.splice(index, 1);
    onChange({
      ...data,
      employmentDetails: newEmploymentDetails,
    });
  };

  const handleEmploymentChange = (index: number, field: keyof EmploymentDetail, value: any) => {
    const newEmploymentDetails = [...data.employmentDetails];
    newEmploymentDetails[index] = {
      ...newEmploymentDetails[index],
      [field]: value,
    };
    onChange({
      ...data,
      employmentDetails: newEmploymentDetails,
    });
  };

  const handleAddAdditionalIncome = () => {
    onChange({
      ...data,
      additionalIncome: [
        ...data.additionalIncome,
        {
          type: '',
          amount: 0,
          frequency: '',
        },
      ],
    });
  };

  const handleRemoveAdditionalIncome = (index: number) => {
    const newAdditionalIncome = [...data.additionalIncome];
    newAdditionalIncome.splice(index, 1);
    onChange({
      ...data,
      additionalIncome: newAdditionalIncome,
    });
  };

  const handleAdditionalIncomeChange = (index: number, field: keyof AdditionalIncome, value: any) => {
    const newAdditionalIncome = [...data.additionalIncome];
    newAdditionalIncome[index] = {
      ...newAdditionalIncome[index],
      [field]: value,
    };
    onChange({
      ...data,
      additionalIncome: newAdditionalIncome,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Income Details
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Employment Status</InputLabel>
          <Select
            value={data.employmentStatus}
            onChange={(e) => handleEmploymentStatusChange(e.target.value)}
            label="Employment Status"
            required
          >
            <MenuItem value="employed">Employed</MenuItem>
            <MenuItem value="self-employed">Self-employed</MenuItem>
            <MenuItem value="retired">Retired</MenuItem>
            <MenuItem value="unemployed">Unemployed</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Employment Details */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Employment Details
        </Typography>
      </Grid>

      {data.employmentDetails.map((employment, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Employment {index + 1}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Employer Name"
                  value={employment.employerName}
                  onChange={(e) => handleEmploymentChange(index, 'employerName', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={employment.jobTitle}
                  onChange={(e) => handleEmploymentChange(index, 'jobTitle', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  value={employment.startDate}
                  onChange={(e) => handleEmploymentChange(index, 'startDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Annual Income"
                  value={employment.income}
                  onChange={(e) => handleEmploymentChange(index, 'income', parseFloat(e.target.value))}
                  InputProps={{
                    startAdornment: <Typography>£</Typography>,
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => handleRemoveEmployment(index)}
                    color="error"
                    aria-label="remove employment"
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
            onClick={handleAddEmployment}
            sx={{ minWidth: 200 }}
          >
            Add Employment
          </Button>
        </Box>
      </Grid>

      {/* Additional Income */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
          Additional Income
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          For all property related income declared to HMRC please add this to the sole trader section as this would be disclosed on your tax returns.
        </Typography>
      </Grid>

      {data.additionalIncome.map((income, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Additional Income {index + 1}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Income Type</InputLabel>
                  <Select
                    value={income.type}
                    onChange={(e) => handleAdditionalIncomeChange(index, 'type', e.target.value)}
                    label="Income Type"
                    required
                  >
                    <MenuItem value="pension">Pension</MenuItem>
                    <MenuItem value="benefits">Benefits</MenuItem>
                    <MenuItem value="investment">Investment Income</MenuItem>
                    <MenuItem value="rental">Rental Income</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount"
                  value={income.amount}
                  onChange={(e) => handleAdditionalIncomeChange(index, 'amount', parseFloat(e.target.value))}
                  InputProps={{
                    startAdornment: <Typography>£</Typography>,
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={income.frequency}
                    onChange={(e) => handleAdditionalIncomeChange(index, 'frequency', e.target.value)}
                    label="Frequency"
                    required
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="annually">Annually</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => handleRemoveAdditionalIncome(index)}
                    color="error"
                    aria-label="remove additional income"
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
            onClick={handleAddAdditionalIncome}
            sx={{ minWidth: 200 }}
          >
            Add Additional Income
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default IncomeSection; 