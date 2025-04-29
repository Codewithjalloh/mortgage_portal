import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { PersonalDetails } from '../../../types/MortgageApplication';

interface PersonalDetailsSectionProps {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handleBooleanChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      [name]: event.target.value === 'true',
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Number of Applicants */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Number of applicants on the mortgage</InputLabel>
          <Select
            name="numberOfApplicants"
            value={data.numberOfApplicants}
            onChange={handleSelectChange}
            label="Number of applicants on the mortgage"
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Title */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Title</InputLabel>
          <Select
            name="title"
            value={data.title}
            onChange={handleSelectChange}
            label="Title"
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
            <MenuItem value="Ms">Ms</MenuItem>
            <MenuItem value="Dr">Dr</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Name Fields */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Middle name(s)"
          name="middleNames"
          value={data.middleNames}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Surname"
          name="surname"
          value={data.surname}
          onChange={handleChange}
          required
        />
      </Grid>

      {/* Name Changed */}
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Has your name changed in the last 6 years?
          </Typography>
          <RadioGroup
            name="nameChanged"
            value={data.nameChanged.toString()}
            onChange={handleBooleanChange('nameChanged')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Date of Birth and Age */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="date"
          label="Date of birth"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Age"
          name="age"
          value={data.age}
          InputProps={{ readOnly: true }}
        />
      </Grid>

      {/* Retirement Information */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Anticipated Retirement Age"
          name="anticipatedRetirementAge"
          value={data.anticipatedRetirementAge}
          onChange={handleChange}
          type="number"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Time left until retirement"
          name="timeUntilRetirement"
          value={data.timeUntilRetirement}
          InputProps={{ readOnly: true }}
        />
      </Grid>

      {/* Personal Information */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={data.gender}
            onChange={handleSelectChange}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Marital status</InputLabel>
          <Select
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={handleSelectChange}
            label="Marital status"
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
            <MenuItem value="divorced">Divorced</MenuItem>
            <MenuItem value="widowed">Widowed</MenuItem>
            <MenuItem value="civil-partnership">Civil Partnership</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Location Information */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Country of birth"
          name="countryOfBirth"
          value={data.countryOfBirth}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Nationality"
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Citizenship"
          name="citizenship"
          value={data.citizenship}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Country of residence"
          name="countryOfResidence"
          value={data.countryOfResidence}
          onChange={handleChange}
        />
      </Grid>

      {/* Contact Information */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="National Insurance no"
          name="nationalInsuranceNo"
          value={data.nationalInsuranceNo}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Mobile number"
          name="mobileNumber"
          value={data.mobileNumber}
          onChange={handleChange}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Work number"
          name="workNumber"
          value={data.workNumber}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email address"
          name="emailAddress"
          type="email"
          value={data.emailAddress}
          onChange={handleChange}
          required
        />
      </Grid>

      {/* Contact Preferences */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Preferred contact method</InputLabel>
          <Select
            name="preferredContactMethod"
            value={data.preferredContactMethod}
            onChange={handleSelectChange}
            label="Preferred contact method"
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
            <MenuItem value="work">Work Phone</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Preferred contact time</InputLabel>
          <Select
            name="preferredContactTime"
            value={data.preferredContactTime}
            onChange={handleSelectChange}
            label="Preferred contact time"
          >
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="afternoon">Afternoon</MenuItem>
            <MenuItem value="evening">Evening</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Additional Questions */}
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Are you a first time buyer?
          </Typography>
          <RadioGroup
            name="firstTimeBuyer"
            value={data.firstTimeBuyer.toString()}
            onChange={handleBooleanChange('firstTimeBuyer')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Have you ever owned a rental property?
          </Typography>
          <RadioGroup
            name="hasRentalProperty"
            value={data.hasRentalProperty.toString()}
            onChange={handleBooleanChange('hasRentalProperty')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Do you or any of your family or close associates hold a "Prominent Public Function"?
          </Typography>
          <RadioGroup
            name="hasProminentPublicFunction"
            value={data.hasProminentPublicFunction.toString()}
            onChange={handleBooleanChange('hasProminentPublicFunction')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Do you have a power of attorney?
          </Typography>
          <RadioGroup
            name="hasPowerOfAttorney"
            value={data.hasPowerOfAttorney.toString()}
            onChange={handleBooleanChange('hasPowerOfAttorney')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Do you have any arrangements for long term care?
          </Typography>
          <RadioGroup
            name="hasLongTermCare"
            value={data.hasLongTermCare.toString()}
            onChange={handleBooleanChange('hasLongTermCare')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Do you have criminal convictions?
          </Typography>
          <RadioGroup
            name="hasCriminalConvictions"
            value={data.hasCriminalConvictions.toString()}
            onChange={handleBooleanChange('hasCriminalConvictions')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Do you have a will?
          </Typography>
          <RadioGroup
            name="hasWill"
            value={data.hasWill.toString()}
            onChange={handleBooleanChange('hasWill')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Would you like us to stay in touch regarding updates to mortgage products and criteria?
          </Typography>
          <RadioGroup
            name="wantsProductUpdates"
            value={data.wantsProductUpdates.toString()}
            onChange={handleBooleanChange('wantsProductUpdates')}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PersonalDetailsSection; 