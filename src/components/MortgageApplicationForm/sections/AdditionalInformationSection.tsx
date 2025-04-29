import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { AdditionalInformation } from '../../../types/MortgageApplication';

interface AdditionalInformationSectionProps {
  data: AdditionalInformation;
  onChange: (data: AdditionalInformation) => void;
}

const AdditionalInformationSection: React.FC<AdditionalInformationSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof AdditionalInformation, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Additional Information
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Expected Changes to Income"
                value={data.incomeChanges}
                onChange={(e) => handleChange('incomeChanges', e.target.value)}
                helperText="Please provide details of any expected changes to your income in the next 12 months"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Early Repayment Plans"
                value={data.earlyRepaymentPlans}
                onChange={(e) => handleChange('earlyRepaymentPlans', e.target.value)}
                helperText="Please provide details if you plan to make any lump sum payments or repay the mortgage early"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Plans to Move"
                value={data.planToMove}
                onChange={(e) => handleChange('planToMove', e.target.value)}
                helperText="Please provide details if you plan to move or sell the property within the next few years"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdditionalInformationSection; 