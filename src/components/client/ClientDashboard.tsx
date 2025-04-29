import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Assessment as AssessmentIcon,
  Description as DocumentIcon,
  Timeline as TimelineIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const dummyCases = [
  {
    id: 'CASE001',
    type: 'Mortgage Application',
    value: '£250,000',
    loan: '£200,000',
    questionnaireStatus: 'Completed',
    documentsOutstanding: 2,
    status: 'In Review',
    lastUpdated: '2024-03-20',
    adviser: 'John Smith',
  },
  {
    id: 'CASE002',
    type: 'Refinance',
    value: '£300,000',
    loan: '£240,000',
    questionnaireStatus: 'In Progress',
    documentsOutstanding: 5,
    status: 'Draft',
    lastUpdated: '2024-03-19',
    adviser: 'Sarah Johnson',
  },
];

const quickStats = [
  { title: 'Active Cases', value: '2', icon: <AssessmentIcon />, color: '#1976d2' },
  { title: 'Documents Pending', value: '7', icon: <DocumentIcon />, color: '#2e7d32' },
  { title: 'Application Progress', value: '65%', icon: <TimelineIcon />, color: '#ed6c02' },
  { title: 'Notifications', value: '3', icon: <NotificationIcon />, color: '#9c27b0' },
];

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const handleCreateCase = () => {
    navigate('/client/new-enquiry');
  };

  const handleViewCase = (caseId: string) => {
    navigate(`/case/${caseId}`);
  };

  const handleDeleteCase = (caseId: string) => {
    setSelectedCase(caseId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Implement delete logic here
    setDeleteDialogOpen(false);
    setSelectedCase(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in review':
        return 'warning';
      case 'draft':
        return 'info';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)' }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'white', color: '#1976d2' }}>
                  JD
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" color="white" gutterBottom>
                  Welcome back, John Doe
                </Typography>
                <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.8)">
                  Here's what's happening with your mortgage applications
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateCase}
                  sx={{ bgcolor: 'white', color: '#1976d2', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' } }}
                >
                  New Mortgage Enquiry
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {quickStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ 
                        p: 1, 
                        borderRadius: 1, 
                        bgcolor: `${stat.color}15`,
                        color: stat.color 
                      }}>
                        {stat.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6">{stat.value}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Cases Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Recent Cases</Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleCreateCase}
              >
                New Case
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Case ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Loan</TableCell>
                    <TableCell>Adviser</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyCases.map((case_) => (
                    <TableRow key={case_.id} hover>
                      <TableCell>{case_.id}</TableCell>
                      <TableCell>{case_.type}</TableCell>
                      <TableCell>{case_.value}</TableCell>
                      <TableCell>{case_.loan}</TableCell>
                      <TableCell>{case_.adviser}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={case_.questionnaireStatus === 'Completed' ? 100 : 65}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {case_.questionnaireStatus === 'Completed' ? '100%' : '65%'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={case_.status}
                          color={getStatusColor(case_.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewCase(case_.id)}
                              color="primary"
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Case">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteCase(case_.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Case</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete case {selectedCase}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientDashboard; 