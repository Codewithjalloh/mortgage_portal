import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import { MortgageRequirements } from '../../../types/MortgageApplication';

interface MortgageRequirementsSectionProps {
  data: MortgageRequirements;
  onChange: (data: MortgageRequirements) => void;
}

const MortgageRequirementsSection: React.FC<MortgageRequirementsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof MortgageRequirements, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleFeatureChange = (feature: keyof MortgageRequirements['features']) => {
    onChange({
      ...data,
      features: {
        ...data.features,
        [feature]: !data.features[feature],
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Mortgage Requirements
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Type of Mortgage</InputLabel>
          <Select
            value={data.type}
            onChange={(e) => handleChange('type', e.target.value)}
            label="Type of Mortgage"
            required
          >
            <MenuItem value="Purchase">Purchase</MenuItem>
            <MenuItem value="Remortgage">Remortgage</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select
            value={data.propertyType}
            onChange={(e) => handleChange('propertyType', e.target.value)}
            label="Property Type"
            required
          >
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Buy-To-Let">Buy-To-Let</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Product Type</InputLabel>
          <Select
            value={data.productType}
            onChange={(e) => handleChange('productType', e.target.value)}
            label="Product Type"
            required
          >
            <MenuItem value="Fixed">Fixed Rate</MenuItem>
            <MenuItem value="Variable">Variable Rate</MenuItem>
            <MenuItem value="Tracker">Tracker Rate</MenuItem>
            <MenuItem value="Discount">Discount Rate</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Product Term (years)"
          type="number"
          value={data.productTerm}
          onChange={(e) => handleChange('productTerm', parseInt(e.target.value))}
          required
          inputProps={{ min: 1, max: 10 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Mortgage Term (years)"
          type="number"
          value={data.mortgageTerm}
          onChange={(e) => handleChange('mortgageTerm', parseInt(e.target.value))}
          required
          inputProps={{ min: 5, max: 40 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Mortgage Amount"
          type="number"
          value={data.mortgageAmount}
          onChange={(e) => handleChange('mortgageAmount', parseFloat(e.target.value))}
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Maximum Monthly Budget"
          type="number"
          value={data.maximumMonthlyBudget}
          onChange={(e) => handleChange('maximumMonthlyBudget', parseFloat(e.target.value))}
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Loan to Value (%)"
          type="number"
          value={data.loanToValue}
          onChange={(e) => handleChange('loanToValue', parseFloat(e.target.value))}
          required
          inputProps={{ min: 0, max: 100 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Product Features
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.features.addFeeToLoan}
                    onChange={() => handleFeatureChange('addFeeToLoan')}
                  />
                }
                label="Add Fee to Loan"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.features.freeValuation}
                    onChange={() => handleFeatureChange('freeValuation')}
                  />
                }
                label="Free Valuation"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.features.freeConveyancing}
                    onChange={() => handleFeatureChange('freeConveyancing')}
                  />
                }
                label="Free Conveyancing"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.features.cashback}
                    onChange={() => handleFeatureChange('cashback')}
                  />
                }
                label="Cashback"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.features.noEarlyRepaymentPenalties}
                    onChange={() => handleFeatureChange('noEarlyRepaymentPenalties')}
                  />
                }
                label="No Early Repayment Penalties"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.features.allowOverpayments}
                    onChange={() => handleFeatureChange('allowOverpayments')}
                  />
                }
                label="Allow Overpayments"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MortgageRequirementsSection; 