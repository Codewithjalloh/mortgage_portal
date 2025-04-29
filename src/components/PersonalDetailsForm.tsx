import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
} from '@mui/material';

interface PersonalDetailsFormData {
  numberOfApplicants: string;
  title: string;
  firstName: string;
  middleNames: string;
  surname: string;
  nameChanged: boolean;
  dateOfBirth: string;
  age: string;
  anticipatedRetirementAge: string;
  timeUntilRetirement: string;
  gender: string;
  maritalStatus: string;
  countryOfBirth: string;
  nationality: string;
  citizenship: string;
  countryOfResidence: string;
  nationalInsuranceNo: string;
  mobileNumber: string;
  workNumber: string;
  emailAddress: string;
  preferredContactMethod: string;
  preferredContactTime: string;
  firstTimeBuyer: boolean;
}

const PersonalDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<PersonalDetailsFormData>({
    numberOfApplicants: '',
    title: '',
    firstName: '',
    middleNames: '',
    surname: '',
    nameChanged: false,
    dateOfBirth: '',
    age: '',
    anticipatedRetirementAge: '',
    timeUntilRetirement: '',
    gender: '',
    maritalStatus: '',
    countryOfBirth: '',
    nationality: '',
    citizenship: '',
    countryOfResidence: '',
    nationalInsuranceNo: '',
    mobileNumber: '',
    workNumber: '',
    emailAddress: '',
    preferredContactMethod: '',
    preferredContactTime: '',
    firstTimeBuyer: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Typography variant="h5" gutterBottom>
          Personal Details
        </Typography>

        <Grid container spacing={3}>
          {/* Number of Applicants */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Number of applicants</InputLabel>
              <Select
                name="numberOfApplicants"
                value={formData.numberOfApplicants}
                onChange={handleSelectChange}
                label="Number of applicants"
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
                value={formData.title}
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
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle name(s)"
              name="middleNames"
              value={formData.middleNames}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
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
                value={formData.nameChanged.toString()}
                onChange={handleChange}
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
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Retirement Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Anticipated Retirement Age"
              name="anticipatedRetirementAge"
              value={formData.anticipatedRetirementAge}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Time left until retirement"
              name="timeUntilRetirement"
              value={formData.timeUntilRetirement}
              onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Personal Information */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
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
                value={formData.maritalStatus}
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
              value={formData.countryOfBirth}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Citizenship"
              name="citizenship"
              value={formData.citizenship}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country of residence"
              name="countryOfResidence"
              value={formData.countryOfResidence}
              onChange={handleChange}
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="National Insurance no"
              name="nationalInsuranceNo"
              value={formData.nationalInsuranceNo}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Work number"
              name="workNumber"
              value={formData.workNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email address"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </Grid>

          {/* Contact Preferences */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Preferred contact method</InputLabel>
              <Select
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
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
                value={formData.preferredContactTime}
                onChange={handleSelectChange}
                label="Preferred contact time"
              >
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="afternoon">Afternoon</MenuItem>
                <MenuItem value="evening">Evening</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* First Time Buyer */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle2" gutterBottom>
                Are you a first time buyer?
              </Typography>
              <RadioGroup
                name="firstTimeBuyer"
                value={formData.firstTimeBuyer.toString()}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PersonalDetailsForm; 