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
import { PropertyInformation } from '../../../types/MortgageApplication';

interface PropertyInformationSectionProps {
  data: PropertyInformation;
  onChange: (data: PropertyInformation) => void;
}

const PropertyInformationSection: React.FC<PropertyInformationSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof PropertyInformation, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleAddressChange = (field: keyof PropertyInformation['address'], value: any) => {
    onChange({
      ...data,
      address: {
        ...data.address,
        [field]: value,
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Property Information
        </Typography>
      </Grid>

      {/* Property Address */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Property Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Building Name"
                value={data.address.buildingName}
                onChange={(e) => handleAddressChange('buildingName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Building Number"
                value={data.address.buildingNumber}
                onChange={(e) => handleAddressChange('buildingNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Name"
                value={data.address.streetName}
                onChange={(e) => handleAddressChange('streetName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Town"
                value={data.address.town}
                onChange={(e) => handleAddressChange('town', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={data.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postcode"
                value={data.address.postcode}
                onChange={(e) => handleAddressChange('postcode', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Property Details */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select
            value={data.propertyType}
            onChange={(e) => handleChange('propertyType', e.target.value)}
            label="Property Type"
            required
          >
            <MenuItem value="detached">Detached</MenuItem>
            <MenuItem value="semi-detached">Semi-Detached</MenuItem>
            <MenuItem value="terraced">Terraced</MenuItem>
            <MenuItem value="flat">Flat/Apartment</MenuItem>
            <MenuItem value="bungalow">Bungalow</MenuItem>
            <MenuItem value="maisonette">Maisonette</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Property Style</InputLabel>
          <Select
            value={data.propertyStyle}
            onChange={(e) => handleChange('propertyStyle', e.target.value)}
            label="Property Style"
            required
          >
            <MenuItem value="modern">Modern</MenuItem>
            <MenuItem value="period">Period</MenuItem>
            <MenuItem value="contemporary">Contemporary</MenuItem>
            <MenuItem value="traditional">Traditional</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Tenure</InputLabel>
          <Select
            value={data.tenure}
            onChange={(e) => handleChange('tenure', e.target.value)}
            label="Tenure"
            required
          >
            <MenuItem value="freehold">Freehold</MenuItem>
            <MenuItem value="leasehold">Leasehold</MenuItem>
            <MenuItem value="share-of-freehold">Share of Freehold</MenuItem>
            <MenuItem value="commonhold">Commonhold</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Build Date"
          type="number"
          value={data.buildDate}
          onChange={(e) => handleChange('buildDate', e.target.value)}
          required
          inputProps={{ min: 1600, max: new Date().getFullYear() }}
        />
      </Grid>

      {/* Construction */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Wall Construction</InputLabel>
          <Select
            value={data.wallConstruction}
            onChange={(e) => handleChange('wallConstruction', e.target.value)}
            label="Wall Construction"
            required
          >
            <MenuItem value="brick">Brick</MenuItem>
            <MenuItem value="stone">Stone</MenuItem>
            <MenuItem value="timber-frame">Timber Frame</MenuItem>
            <MenuItem value="concrete">Concrete</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Roof Construction</InputLabel>
          <Select
            value={data.roofConstruction}
            onChange={(e) => handleChange('roofConstruction', e.target.value)}
            label="Roof Construction"
            required
          >
            <MenuItem value="tile">Tile</MenuItem>
            <MenuItem value="slate">Slate</MenuItem>
            <MenuItem value="thatch">Thatch</MenuItem>
            <MenuItem value="flat">Flat</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Property Features */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Property Features
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isExLocalAuthority}
                    onChange={(e) => handleChange('isExLocalAuthority', e.target.checked)}
                  />
                }
                label="Ex-Local Authority Property"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isNewBuild}
                    onChange={(e) => handleChange('isNewBuild', e.target.checked)}
                  />
                }
                label="New Build Property"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.hasSprayFoamInsulation}
                    onChange={(e) => handleChange('hasSprayFoamInsulation', e.target.checked)}
                  />
                }
                label="Has Spray Foam Insulation"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.hasSolarPanels}
                    onChange={(e) => handleChange('hasSolarPanels', e.target.checked)}
                  />
                }
                label="Has Solar Panels"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.hasCommercialProperties}
                    onChange={(e) => handleChange('hasCommercialProperties', e.target.checked)}
                  />
                }
                label="Has Commercial Properties Nearby"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Room Details */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Bedrooms"
          type="number"
          value={data.bedrooms}
          onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
          required
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Bathrooms"
          type="number"
          value={data.bathrooms}
          onChange={(e) => handleChange('bathrooms', parseInt(e.target.value))}
          required
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of WCs"
          type="number"
          value={data.wcs}
          onChange={(e) => handleChange('wcs', parseInt(e.target.value))}
          required
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Reception Rooms"
          type="number"
          value={data.receptionRooms}
          onChange={(e) => handleChange('receptionRooms', parseInt(e.target.value))}
          required
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Kitchens"
          type="number"
          value={data.kitchens}
          onChange={(e) => handleChange('kitchens', parseInt(e.target.value))}
          required
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Parking Facilities</InputLabel>
          <Select
            value={data.parkingFacilities}
            onChange={(e) => handleChange('parkingFacilities', e.target.value)}
            label="Parking Facilities"
            required
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="on-street">On Street</MenuItem>
            <MenuItem value="driveway">Driveway</MenuItem>
            <MenuItem value="garage">Garage</MenuItem>
            <MenuItem value="carport">Carport</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Additional Details */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="EPC Rating"
          value={data.epcRating}
          onChange={(e) => handleChange('epcRating', e.target.value)}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Ground Rent"
          type="number"
          value={data.groundRent}
          onChange={(e) => handleChange('groundRent', parseFloat(e.target.value))}
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Service Charge"
          type="number"
          value={data.serviceCharge}
          onChange={(e) => handleChange('serviceCharge', parseFloat(e.target.value))}
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PropertyInformationSection; 