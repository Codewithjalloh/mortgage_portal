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
} from '@mui/material';
import { Adverse } from '../../../types/MortgageApplication';

interface AdverseSectionProps {
  data: Adverse;
  onChange: (data: Adverse) => void;
}

const AdverseSection: React.FC<AdverseSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof Adverse) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      [field]: event.target.value === 'true',
    });
  };

  const questions: Array<{ field: keyof Adverse; question: string }> = [
    {
      field: 'latePayments',
      question: 'Have you been late with any payments or had any direct debit transaction reversals due to not having enough funds in your account in the last 6 months?',
    },
    {
      field: 'currentArrears',
      question: 'Are you currently in arrears with any commitments?',
    },
    {
      field: 'missedPayments',
      question: 'Have you missed any payments as recorded on your credit file in the last 6 years?',
    },
    {
      field: 'paydayLoans',
      question: 'Have you applied for any payday loans in the last 3 years?',
    },
    {
      field: 'ccjs',
      question: 'Have you ever had county court judgements (CCJ) issued against you in the last 6 years?',
    },
    {
      field: 'defaults',
      question: 'Have you ever had a default issued against you in the last 6 years?',
    },
    {
      field: 'ivaOrDmp',
      question: 'Are you currently in an Individual voluntary agreement (IVA) or a debt management plan (DMP)?',
    },
    {
      field: 'paymentArrangements',
      question: 'Do you have an arrangement to pay set up with any commitments due to not being able to meet the monthly payments?',
    },
    {
      field: 'bankruptcy',
      question: 'Have you ever been declared bankrupt?',
    },
    {
      field: 'repossession',
      question: 'Have you had a property repossessed?',
    },
    {
      field: 'mortgageDeclined',
      question: 'Have you previously had a mortgage declined?',
    },
    {
      field: 'exceededCreditLimit',
      question: 'Have you exceeded your credit card limited in the last 2 years?',
    },
    {
      field: 'otherCreditProblems',
      question: 'Have you experienced any other credit problems in the past?',
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Adverse Credit History
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Alert severity="info" sx={{ mb: 3 }}>
          If you answer yes to any of the below questions please supply your credit report from www.checkmyfile.com
        </Alert>
      </Grid>

      {questions.map(({ field, question }) => (
        <Grid item xs={12} key={field}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <FormControl component="fieldset">
              <Typography variant="subtitle2" gutterBottom>
                {question}
              </Typography>
              <RadioGroup
                row
                value={data[field].toString()}
                onChange={handleChange(field as keyof Adverse)}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdverseSection; 