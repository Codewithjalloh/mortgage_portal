import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Case {
  id: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  description: string;
}

const mockCases: Case[] = [
  {
    id: '1',
    type: 'Mortgage Application',
    status: 'in_progress',
    createdAt: '2024-03-17',
    description: 'First time buyer mortgage application',
  },
  {
    id: '2',
    type: 'Remortgage',
    status: 'pending',
    createdAt: '2024-03-16',
    description: 'Remortgage application for existing property',
  },
];

const ClientCases: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">My Cases</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/client/create-case')}
        >
          Create New Case
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell>{case_.id}</TableCell>
                <TableCell>{case_.type}</TableCell>
                <TableCell>{case_.description}</TableCell>
                <TableCell>
                  <Chip
                    label={case_.status.replace('_', ' ')}
                    color={getStatusColor(case_.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(case_.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/client/case/${case_.id}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientCases; 