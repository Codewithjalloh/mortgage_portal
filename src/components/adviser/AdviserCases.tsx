import React, { useState } from 'react';
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
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Case {
  id: string;
  clientName: string;
  caseType: string;
  value: number;
  loan: number;
  questionnaireStatus: 'pending' | 'in_progress' | 'completed';
  documentsOutstanding: number;
  status: 'new' | 'in_progress' | 'pending_review' | 'completed' | 'cancelled';
  assignedTo: string | null;
  lastUpdated: string;
}

const AdviserCases: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cases, setCases] = useState<Case[]>([
    {
      id: 'CASE001',
      clientName: 'John Doe',
      caseType: 'Mortgage Application',
      value: 300000,
      loan: 240000,
      questionnaireStatus: 'completed',
      documentsOutstanding: 2,
      status: 'in_progress',
      assignedTo: 'Me',
      lastUpdated: '2024-03-20',
    },
    {
      id: 'CASE002',
      clientName: 'Sarah Johnson',
      caseType: 'Remortgage',
      value: 450000,
      loan: 180000,
      questionnaireStatus: 'in_progress',
      documentsOutstanding: 3,
      status: 'pending_review',
      assignedTo: 'Me',
      lastUpdated: '2024-03-19',
    },
    {
      id: 'CASE003',
      clientName: 'Michael Brown',
      caseType: 'Buy to Let',
      value: 250000,
      loan: 200000,
      questionnaireStatus: 'pending',
      documentsOutstanding: 4,
      status: 'new',
      assignedTo: null,
      lastUpdated: '2024-03-18',
    },
    {
      id: 'CASE004',
      clientName: 'Emma Wilson',
      caseType: 'Mortgage Application',
      value: 350000,
      loan: 280000,
      questionnaireStatus: 'completed',
      documentsOutstanding: 0,
      status: 'completed',
      assignedTo: 'Me',
      lastUpdated: '2024-03-17',
    },
    {
      id: 'CASE005',
      clientName: 'David Lee',
      caseType: 'Remortgage',
      value: 400000,
      loan: 160000,
      questionnaireStatus: 'completed',
      documentsOutstanding: 1,
      status: 'in_progress',
      assignedTo: 'Me',
      lastUpdated: '2024-03-16',
    },
    {
      id: 'CASE006',
      clientName: 'Lisa Anderson',
      caseType: 'Buy to Let',
      value: 280000,
      loan: 224000,
      questionnaireStatus: 'in_progress',
      documentsOutstanding: 2,
      status: 'pending_review',
      assignedTo: null,
      lastUpdated: '2024-03-15',
    },
    {
      id: 'CASE007',
      clientName: 'Robert Taylor',
      caseType: 'Mortgage Application',
      value: 320000,
      loan: 256000,
      questionnaireStatus: 'pending',
      documentsOutstanding: 5,
      status: 'new',
      assignedTo: null,
      lastUpdated: '2024-03-14',
    },
    {
      id: 'CASE008',
      clientName: 'Sophie Clark',
      caseType: 'Remortgage',
      value: 380000,
      loan: 152000,
      questionnaireStatus: 'completed',
      documentsOutstanding: 0,
      status: 'completed',
      assignedTo: 'Me',
      lastUpdated: '2024-03-13',
    },
  ]);

  const handleAssignCase = (caseId: string) => {
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, assignedTo: 'Me' } : c
    ));
  };

  const handleUpdateStatus = (caseId: string, newStatus: Case['status']) => {
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, status: newStatus } : c
    ));
  };

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'in_progress':
        return 'primary';
      case 'pending_review':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getQuestionnaireStatusIcon = (status: Case['questionnaireStatus']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in_progress':
        return <WarningIcon color="warning" />;
      case 'pending':
        return <WarningIcon color="error" />;
      default:
        return null;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Case Management
      </Typography>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="pending_review">Pending Review</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Cases Table */}
      <Paper sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Case ID</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Case Type</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Loan</TableCell>
                <TableCell>Questionnaire</TableCell>
                <TableCell>Documents</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell>{case_.id}</TableCell>
                  <TableCell>{case_.clientName}</TableCell>
                  <TableCell>{case_.caseType}</TableCell>
                  <TableCell>£{case_.value.toLocaleString()}</TableCell>
                  <TableCell>£{case_.loan.toLocaleString()}</TableCell>
                  <TableCell>
                    {getQuestionnaireStatusIcon(case_.questionnaireStatus)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${case_.documentsOutstanding} outstanding`}
                      color={case_.documentsOutstanding > 0 ? 'warning' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={case_.status.replace('_', ' ')}
                      color={getStatusColor(case_.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{case_.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>{case_.lastUpdated}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/adviser/cases/${case_.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    {!case_.assignedTo && (
                      <IconButton
                        size="small"
                        onClick={() => handleAssignCase(case_.id)}
                      >
                        <AssignmentIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdviserCases; 