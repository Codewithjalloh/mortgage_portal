import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  IconButton,
  Box,
  Button,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PropertyPortfolio, Property } from '../../../types/MortgageApplication';

interface PropertyPortfolioSectionProps {
  data: PropertyPortfolio;
  onChange: (data: PropertyPortfolio) => void;
}

const PropertyPortfolioSection: React.FC<PropertyPortfolioSectionProps> = ({
  data,
  onChange,
}) => {
  const handleAddProperty = () => {
    onChange({
      properties: [
        ...data.properties,
        {
          address: {
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
          value: 0,
          mortgage: 0,
          monthlyPayment: 0,
          monthlyRent: 0,
        },
      ],
    });
  };

  const handleRemoveProperty = (index: number) => {
    const newProperties = [...data.properties];
    newProperties.splice(index, 1);
    onChange({ properties: newProperties });
  };

  const handlePropertyChange = (index: number, field: keyof Property, value: any) => {
    const newProperties = [...data.properties];
    newProperties[index] = {
      ...newProperties[index],
      [field]: value,
    };
    onChange({ properties: newProperties });
  };

  const handleAddressChange = (propertyIndex: number, field: keyof Property['address'], value: any) => {
    const newProperties = [...data.properties];
    newProperties[propertyIndex] = {
      ...newProperties[propertyIndex],
      address: {
        ...newProperties[propertyIndex].address,
        [field]: value,
      },
    };
    onChange({ properties: newProperties });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Property Portfolio
        </Typography>
      </Grid>

      {data.properties.map((property, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Property {index + 1}
                </Typography>
              </Grid>

              {/* Property Address */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Property Address
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Building Name"
                  value={property.address.buildingName}
                  onChange={(e) => handleAddressChange(index, 'buildingName', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Building Number"
                  value={property.address.buildingNumber}
                  onChange={(e) => handleAddressChange(index, 'buildingNumber', e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Name"
                  value={property.address.streetName}
                  onChange={(e) => handleAddressChange(index, 'streetName', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Town"
                  value={property.address.town}
                  onChange={(e) => handleAddressChange(index, 'town', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={property.address.city}
                  onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postcode"
                  value={property.address.postcode}
                  onChange={(e) => handleAddressChange(index, 'postcode', e.target.value)}
                  required
                />
              </Grid>

              {/* Property Financial Details */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Financial Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Property Value"
                  type="number"
                  value={property.value}
                  onChange={(e) => handlePropertyChange(index, 'value', parseFloat(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Outstanding Mortgage"
                  type="number"
                  value={property.mortgage}
                  onChange={(e) => handlePropertyChange(index, 'mortgage', parseFloat(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monthly Mortgage Payment"
                  type="number"
                  value={property.monthlyPayment}
                  onChange={(e) => handlePropertyChange(index, 'monthlyPayment', parseFloat(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monthly Rental Income"
                  type="number"
                  value={property.monthlyRent}
                  onChange={(e) => handlePropertyChange(index, 'monthlyRent', parseFloat(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => handleRemoveProperty(index)}
                    color="error"
                    aria-label="remove property"
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
            onClick={handleAddProperty}
            sx={{ minWidth: 200 }}
          >
            Add Property
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PropertyPortfolioSection; 