import React from 'react';
import {
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Alert,
  Box,
  Divider,
} from '@mui/material';
import { Insurance } from '../../../types/MortgageApplication';

interface InsuranceSectionProps {
  data: Insurance;
  onChange: (data: Insurance) => void;
}

const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof Insurance): (event: React.ChangeEvent<HTMLInputElement>) => void => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...data,
        [field]: event.target.value === 'true',
      });
    };
  };

  const insuranceQuestions: Array<{ field: keyof Insurance; question: string; description: string }> = [
    {
      field: 'hasLifeInsurance',
      question: 'Do you have life insurance in place?',
      description: "Life insurance pays out a lump sum if you die during the policy term.",
    },
    {
      field: 'hasCriticalIllnessCover',
      question: 'Do you have critical illness cover?',
      description: "Critical illness cover pays out a tax-free lump sum if you're diagnosed with a serious illness covered by your policy.",
    },
    {
      field: 'hasIncomeProtection',
      question: 'Do you have income protection insurance?',
      description: "Income protection provides regular payments if you're unable to work due to illness or injury.",
    },
    {
      field: 'hasBuildingsInsurance',
      question: 'Do you have buildings insurance?',
      description: "Buildings insurance covers the cost of repairing damage to the structure of your property.",
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: 'background.default' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Insurance Requirements
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Please provide details about your current insurance coverage and requirements.
        </Typography>
      </Paper>

      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        It's important to consider protecting yourself, your family, and your property with appropriate insurance coverage.
      </Alert>

      <Grid container spacing={3}>
        {insuranceQuestions.map(({ field, question, description }, index) => (
          <Grid item xs={12} key={field}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: 'background.paper',
                '&:hover': {
                  borderColor: 'primary.main',
                  transition: 'border-color 0.2s ease-in-out',
                }
              }}
            >
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  {question}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  {description}
                </Typography>
                <RadioGroup
                  row
                  value={data[field].toString()}
                  onChange={handleChange(field as keyof Insurance)}
                  sx={{ 
                    '& .MuiFormControlLabel-root': {
                      mr: 4,
                    }
                  }}
                >
                  <FormControlLabel 
                    value="true" 
                    control={<Radio color="primary" />} 
                    label="Yes" 
                  />
                  <FormControlLabel 
                    value="false" 
                    control={<Radio color="primary" />} 
                    label="No" 
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Alert 
        severity="warning" 
        sx={{ 
          mt: 3, 
          borderRadius: 2,
          '& .MuiAlert-icon': {
            color: 'warning.main',
          }
        }}
      >
        Please note that buildings insurance is typically required by mortgage lenders and should be in place from the exchange of contracts.
      </Alert>
    </Box>
  );
};

export default InsuranceSection; 