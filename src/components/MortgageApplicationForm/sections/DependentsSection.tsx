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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dependent } from '../../../types/MortgageApplication';

interface DependentsSectionProps {
  data: Dependent[];
  onChange: (data: Dependent[]) => void;
}

const DependentsSection: React.FC<DependentsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleAddDependent = () => {
    onChange([
      ...data,
      {
        name: '',
        age: '',
        relationship: '',
      },
    ]);
  };

  const handleRemoveDependent = (index: number) => {
    const newDependents = [...data];
    newDependents.splice(index, 1);
    onChange(newDependents);
  };

  const handleDependentChange = (index: number, field: keyof Dependent, value: string) => {
    const newDependents = [...data];
    newDependents[index] = {
      ...newDependents[index],
      [field]: value,
    };
    onChange(newDependents);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Do you have any financial dependents?
        </Typography>
      </Grid>

      {data.map((dependent, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Dependent {index + 1}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  value={dependent.name}
                  onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={dependent.age}
                  onChange={(e) => handleDependentChange(index, 'age', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Relationship</InputLabel>
                  <Select
                    value={dependent.relationship}
                    onChange={(e) => handleDependentChange(index, 'relationship', e.target.value)}
                    label="Relationship"
                    required
                  >
                    <MenuItem value="child">Child</MenuItem>
                    <MenuItem value="stepchild">Stepchild</MenuItem>
                    <MenuItem value="parent">Parent</MenuItem>
                    <MenuItem value="grandparent">Grandparent</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={() => handleRemoveDependent(index)}
                  color="error"
                  aria-label="remove dependent"
                >
                  <DeleteIcon />
                </IconButton>
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
            onClick={handleAddDependent}
            sx={{ minWidth: 200 }}
          >
            Add Dependent
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DependentsSection; 