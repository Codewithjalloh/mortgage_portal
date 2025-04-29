import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
} from '@mui/material';
import { Contact } from '../../../types/MortgageApplication';

interface ContactsSectionProps {
  data: Contact;
  onChange: (data: Contact) => void;
}

const ContactsSection: React.FC<ContactsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleEstateAgentInvolvedChange = (value: boolean) => {
    onChange({
      ...data,
      estateAgentInvolved: value,
      estateAgentDetails: value ? (data.estateAgentDetails || {
        name: '',
        company: '',
        phone: '',
        email: '',
      }) : undefined,
    });
  };

  const handleEstateAgentDetailsChange = (field: keyof NonNullable<Contact['estateAgentDetails']>, value: string) => {
    if (!data.estateAgentDetails) return;
    onChange({
      ...data,
      estateAgentDetails: {
        ...data.estateAgentDetails,
        [field]: value,
      },
    });
  };

  const handleSolicitorDetailsChange = (field: keyof NonNullable<Contact['solicitorDetails']>, value: string) => {
    onChange({
      ...data,
      solicitorDetails: {
        ...(data.solicitorDetails || {
          name: '',
          company: '',
          phone: '',
          email: '',
        }),
        [field]: value,
      },
    });
  };

  const handleValuationAccessContactChange = (field: keyof Contact['valuationAccessContact'], value: string) => {
    onChange({
      ...data,
      valuationAccessContact: {
        ...data.valuationAccessContact,
        [field]: value,
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
      </Grid>

      {/* Estate Agent Section */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Estate Agent Details
          </Typography>

          <FormControl component="fieldset">
            <Typography variant="subtitle2" gutterBottom>
              Is an estate agent involved in this application?
            </Typography>
            <RadioGroup
              row
              value={data.estateAgentInvolved.toString()}
              onChange={(e) => handleEstateAgentInvolvedChange(e.target.value === 'true')}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {data.estateAgentInvolved && data.estateAgentDetails && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estate Agent Name"
                  value={data.estateAgentDetails.name}
                  onChange={(e) => handleEstateAgentDetailsChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estate Agent Company"
                  value={data.estateAgentDetails.company}
                  onChange={(e) => handleEstateAgentDetailsChange('company', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estate Agent Phone"
                  value={data.estateAgentDetails.phone}
                  onChange={(e) => handleEstateAgentDetailsChange('phone', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estate Agent Email"
                  type="email"
                  value={data.estateAgentDetails.email}
                  onChange={(e) => handleEstateAgentDetailsChange('email', e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>

      {/* Solicitor Section */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Solicitor Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Solicitor Name"
                value={data.solicitorDetails?.name || ''}
                onChange={(e) => handleSolicitorDetailsChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Solicitor Company"
                value={data.solicitorDetails?.company || ''}
                onChange={(e) => handleSolicitorDetailsChange('company', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Solicitor Phone"
                value={data.solicitorDetails?.phone || ''}
                onChange={(e) => handleSolicitorDetailsChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Solicitor Email"
                type="email"
                value={data.solicitorDetails?.email || ''}
                onChange={(e) => handleSolicitorDetailsChange('email', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Valuation Access Contact Section */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Valuation Access Contact
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Name"
                value={data.valuationAccessContact.name}
                onChange={(e) => handleValuationAccessContactChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={data.valuationAccessContact.phone}
                onChange={(e) => handleValuationAccessContactChange('phone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={data.valuationAccessContact.email}
                onChange={(e) => handleValuationAccessContactChange('email', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ContactsSection; 