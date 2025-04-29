import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  FileCopy as FileCopyIcon,
  Task as TaskIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Save as SaveIcon,
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

interface AdviserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface Activity {
  id: string;
  type: 'case_update' | 'document_upload' | 'status_change' | 'assignment';
  description: string;
  timestamp: string;
  caseId?: string;
}

const AdviserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [openNewCase, setOpenNewCase] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
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

  const [profile, setProfile] = useState<AdviserProfile>({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+44 123 456 7890',
    avatar: 'https://i.pravatar.cc/150?img=1',
  });

  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    {
      id: 'ACT001',
      type: 'case_update',
      description: 'John Doe completed the questionnaire',
      timestamp: '2024-03-20 14:30',
      caseId: 'CASE001',
    },
    {
      id: 'ACT002',
      type: 'document_upload',
      description: 'Sarah Johnson uploaded bank statements',
      timestamp: '2024-03-20 13:15',
      caseId: 'CASE002',
    },
    {
      id: 'ACT003',
      type: 'status_change',
      description: 'Michael Brown case status changed to In Progress',
      timestamp: '2024-03-20 12:00',
      caseId: 'CASE003',
    },
    {
      id: 'ACT004',
      type: 'assignment',
      description: 'New case assigned to you',
      timestamp: '2024-03-20 11:45',
      caseId: 'CASE004',
    },
  ]);

  // Mock data for the chart
  const chartData = [
    { name: 'Jan', cases: 4, completed: 2 },
    { name: 'Feb', cases: 6, completed: 3 },
    { name: 'Mar', cases: 8, completed: 5 },
    { name: 'Apr', cases: 7, completed: 4 },
    { name: 'May', cases: 9, completed: 6 },
    { name: 'Jun', cases: 10, completed: 7 },
  ];

  const handleNewCase = () => {
    setOpenNewCase(true);
  };

  const handleEditProfile = () => {
    setOpenProfile(true);
  };

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

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'case_update':
        return <DescriptionIcon color="primary" />;
      case 'document_upload':
        return <AttachMoneyIcon color="secondary" />;
      case 'status_change':
        return <TrendingUpIcon color="warning" />;
      case 'assignment':
        return <AssignmentIcon color="success" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header Section */}
      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome back, {profile.firstName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Here's what's happening with your cases today
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={handleEditProfile}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewCase}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            New Case
          </Button>
        </Grid>
      </Grid>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
              color: 'white',
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssessmentIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">{cases.length}</Typography>
                </Box>
                <Typography variant="subtitle1">Total Cases</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Active and pending cases
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
              color: 'white',
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">
                    {cases.filter(c => c.assignedTo === 'Me').length}
                  </Typography>
                </Box>
                <Typography variant="subtitle1">Assigned Cases</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Cases you're working on
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)',
              color: 'white',
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileCopyIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">
                    {cases.filter(c => c.documentsOutstanding > 0).length}
                  </Typography>
                </Box>
                <Typography variant="subtitle1">Pending Documents</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Documents awaiting upload
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
              color: 'white',
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TaskIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">
                    {cases.filter(c => c.status === 'completed').length}
                  </Typography>
                </Box>
                <Typography variant="subtitle1">Completed Cases</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Successfully closed cases
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Cases Overview */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Cases Overview
                </Typography>
                <Button
                  variant="text"
                  endIcon={<EditIcon />}
                  onClick={() => navigate('/adviser/cases')}
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              </Stack>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Case ID</TableCell>
                      <TableCell>Client Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cases.slice(0, 5).map((case_) => (
                      <TableRow key={case_.id} hover>
                        <TableCell>{case_.id}</TableCell>
                        <TableCell>{case_.clientName}</TableCell>
                        <TableCell>
                          <Chip
                            label={case_.status.replace('_', ' ')}
                            color={getStatusColor(case_.status)}
                            size="small"
                            sx={{ borderRadius: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress
                              variant="determinate"
                              value={
                                case_.status === 'completed'
                                  ? 100
                                  : case_.status === 'in_progress'
                                  ? 50
                                  : case_.status === 'pending_review'
                                  ? 75
                                  : 25
                              }
                              color={
                                case_.status === 'completed'
                                  ? 'success'
                                  : case_.status === 'in_progress'
                                  ? 'primary'
                                  : case_.status === 'pending_review'
                                  ? 'warning'
                                  : 'info'
                              }
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/adviser/cases/${case_.id}`)}
                            sx={{ 
                              '&:hover': { 
                                backgroundColor: 'primary.light',
                                color: 'white'
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Case Performance
              </Typography>
              <Grid container spacing={2}>
                {chartData.map((data, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ height: '100%', borderRadius: 2 }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {data.name}
                          </Typography>
                          <Typography variant="h6">
                            {data.cases} Cases
                          </Typography>
                          <Typography variant="body2" color="success.main">
                            {data.completed} Completed
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(data.completed / data.cases) * 100}
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                              }
                            }}
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ 
                      borderRadius: 2,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      }
                    }}>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.description}
                        secondary={activity.timestamp}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* New Case Dialog */}
      <Dialog 
        open={openNewCase} 
        onClose={() => setOpenNewCase(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 3,
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <AddIcon color="primary" />
          Create New Case
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client Name"
                variant="outlined"
                placeholder="Enter client's full name"
                InputProps={{
                  startAdornment: (
                    <PersonIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Case Type"
                variant="outlined"
                SelectProps={{
                  startAdornment: (
                    <DescriptionIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
              >
                <MenuItem value="mortgage_application">Mortgage Application</MenuItem>
                <MenuItem value="remortgage">Remortgage</MenuItem>
                <MenuItem value="buy_to_let">Buy to Let</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Property Value"
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Typography variant="body2" sx={{ mr: 1 }}>£</Typography>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Typography variant="body2" sx={{ mr: 1 }}>£</Typography>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          gap: 1
        }}>
          <Button 
            onClick={() => setOpenNewCase(false)}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setOpenNewCase(false)}
            startIcon={<AddIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Create Case
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={openProfile} 
        onClose={() => setOpenProfile(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 3,
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
          color: 'white',
        }}>
          <PersonIcon />
          Edit Profile
        </DialogTitle>
        <DialogContent sx={{ pt: 4 }}>
          <Stack spacing={4} alignItems="center">
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profile.avatar}
                sx={{ 
                  width: 120, 
                  height: 120,
                  border: 4,
                  borderColor: 'primary.main',
                  boxShadow: 3,
                  backgroundColor: 'primary.light',
                }}
              />
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ 
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                  boxShadow: 2,
                }}
              >
                Change Photo
              </Button>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {profile.firstName} {profile.lastName}
            </Typography>
          </Stack>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PersonIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PersonIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <EmailIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PhoneIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          gap: 1,
          backgroundColor: 'grey.50'
        }}>
          <Button 
            onClick={() => setOpenProfile(false)}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setOpenProfile(false)}
            startIcon={<SaveIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #1ba1d9 100%)',
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdviserDashboard; 