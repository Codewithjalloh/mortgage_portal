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
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Address } from '../../../types/MortgageApplication';

interface AddressHistorySectionProps {
  data: Address[];
  onChange: (data: Address[]) => void;
}

const AddressHistorySection: React.FC<AddressHistorySectionProps> = ({
  data,
  onChange,
}) => {
  const handleAddAddress = () => {
    onChange([
      ...data,
      {
        country: '',
        buildingName: '',
        buildingNumber: '',
        streetName: '',
        town: '',
        city: '',
        postcode: '',
        onElectoralRegister: false,
        bankAccountsRegistered: false,
        residencyStatus: '',
        moveInDate: '',
        timeAtAddress: '',
      },
    ]);
  };

  const handleRemoveAddress = (index: number) => {
    const newAddresses = [...data];
    newAddresses.splice(index, 1);
    onChange(newAddresses);
  };

  const handleAddressChange = (index: number, field: keyof Address, value: any) => {
    const newAddresses = [...data];
    newAddresses[index] = {
      ...newAddresses[index],
      [field]: value,
    };
    onChange(newAddresses);
  };

  const calculateTimeAtAddress = (moveInDate: string): string => {
    if (!moveInDate) return '';
    
    const start = new Date(moveInDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    
    let totalMonths = years * 12 + months;
    if (totalMonths < 0) totalMonths = 0;
    
    const finalYears = Math.floor(totalMonths / 12);
    const finalMonths = totalMonths % 12;
    
    return `${finalYears} years, ${finalMonths} months`;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Please provide a 3-year address history
        </Typography>
      </Grid>

      {data.map((address, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Address {index + 1}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={address.country}
                    onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                    label="Country"
                    required
                  >
                    <MenuItem value="UK">United Kingdom</MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                    {/* Add more countries as needed */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Building name"
                  value={address.buildingName}
                  onChange={(e) => handleAddressChange(index, 'buildingName', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Building number"
                  value={address.buildingNumber}
                  onChange={(e) => handleAddressChange(index, 'buildingNumber', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Street name"
                  value={address.streetName}
                  onChange={(e) => handleAddressChange(index, 'streetName', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Town"
                  value={address.town}
                  onChange={(e) => handleAddressChange(index, 'town', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={address.city}
                  onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postcode"
                  value={address.postcode}
                  onChange={(e) => handleAddressChange(index, 'postcode', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle2" gutterBottom>
                    Are you on the electoral register at this address?
                  </Typography>
                  <RadioGroup
                    row
                    value={address.onElectoralRegister.toString()}
                    onChange={(e) => handleAddressChange(index, 'onElectoralRegister', e.target.value === 'true')}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle2" gutterBottom>
                    Are your bank accounts & credit commitments registered to this address?
                  </Typography>
                  <RadioGroup
                    row
                    value={address.bankAccountsRegistered.toString()}
                    onChange={(e) => handleAddressChange(index, 'bankAccountsRegistered', e.target.value === 'true')}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Residency status</InputLabel>
                  <Select
                    value={address.residencyStatus}
                    onChange={(e) => handleAddressChange(index, 'residencyStatus', e.target.value)}
                    label="Residency status"
                    required
                  >
                    <MenuItem value="owner">Owner</MenuItem>
                    <MenuItem value="tenant">Tenant</MenuItem>
                    <MenuItem value="living-with-parents">Living with Parents</MenuItem>
                    <MenuItem value="council-tenant">Council Tenant</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Move-in date"
                  value={address.moveInDate}
                  onChange={(e) => {
                    const moveInDate = e.target.value;
                    handleAddressChange(index, 'moveInDate', moveInDate);
                    handleAddressChange(index, 'timeAtAddress', calculateTimeAtAddress(moveInDate));
                  }}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time at address"
                  value={address.timeAtAddress}
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => handleRemoveAddress(index)}
                    color="error"
                    aria-label="remove address"
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAddress}
            sx={{ minWidth: 200 }}
          >
            Add Address
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddressHistorySection; 