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
  Switch,
  FormControlLabel,
  Alert,
  Stack,
  Card,
  CardContent,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Backup as BackupIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'adviser' | 'client';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  joinDate: string;
  avatar?: string;
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalCases: number;
  pendingCases: number;
  systemLoad: number;
  storageUsed: number;
  lastBackup: string;
}

interface Activity {
  id: string;
  type: 'user_action' | 'system_event' | 'security_alert';
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [users, setUsers] = useState<User[]>([
    {
      id: 'USR001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'adviser',
      status: 'active',
      lastLogin: '2024-03-20 14:30',
      joinDate: '2023-01-15',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 'USR002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'client',
      status: 'active',
      lastLogin: '2024-03-20 13:15',
      joinDate: '2023-02-20',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 'USR003',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      role: 'adviser',
      status: 'pending',
      lastLogin: '2024-03-19 16:45',
      joinDate: '2023-03-10',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ]);

  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 150,
    activeUsers: 120,
    totalCases: 450,
    pendingCases: 75,
    systemLoad: 65,
    storageUsed: 75,
    lastBackup: '2024-03-20 00:00',
  });

  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    {
      id: 'ACT001',
      type: 'user_action',
      description: 'New user registration: Michael Brown',
      timestamp: '2024-03-20 14:30',
      severity: 'low',
    },
    {
      id: 'ACT002',
      type: 'system_event',
      description: 'System backup completed successfully',
      timestamp: '2024-03-20 13:15',
      severity: 'low',
    },
    {
      id: 'ACT003',
      type: 'security_alert',
      description: 'Multiple failed login attempts detected',
      timestamp: '2024-03-20 12:00',
      severity: 'high',
    },
  ]);

  const handleNewUser = () => {
    setOpenNewUser(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenNewUser(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user_action':
        return <PeopleIcon color="primary" />;
      case 'system_event':
        return <SettingsIcon color="secondary" />;
      case 'security_alert':
        return <SecurityIcon color="error" />;
      default:
        return <NotificationsIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Operation completed successfully!
        </Alert>
      )}
      {showError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          An error occurred. Please try again.
        </Alert>
      )}

      {/* Header Section */}
      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}>
              Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              System Overview and Management
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => setOpenSettings(true)}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              borderColor: 'grey.300',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.50',
              }
            }}
          >
            System Settings
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleNewUser}
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
            Add New User
          </Button>
        </Grid>
      </Grid>

      {/* System Statistics */}
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
                  <PeopleIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">{systemStats.totalUsers}</Typography>
                </Box>
                <Typography variant="subtitle1">Total Users</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {systemStats.activeUsers} Active
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
                  <AssessmentIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">{systemStats.totalCases}</Typography>
                </Box>
                <Typography variant="subtitle1">Total Cases</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {systemStats.pendingCases} Pending
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
                  <SpeedIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">{systemStats.systemLoad}%</Typography>
                </Box>
                <Typography variant="subtitle1">System Load</Typography>
                <LinearProgress
                  variant="determinate"
                  value={systemStats.systemLoad}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                    }
                  }}
                />
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
                  <StorageIcon sx={{ fontSize: 30 }} />
                  <Typography variant="h4">{systemStats.storageUsed}%</Typography>
                </Box>
                <Typography variant="subtitle1">Storage Used</Typography>
                <LinearProgress
                  variant="determinate"
                  value={systemStats.storageUsed}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                    }
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* User Management */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold', 
                    mb: 0.5,
                    background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                  }}>
                    User Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage system users and their permissions
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => navigate('/admin/users')}
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 2,
                      borderColor: 'grey.300',
                      '&:hover': {
                        borderColor: 'grey.400',
                        backgroundColor: 'grey.50',
                      }
                    }}
                  >
                    View All
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={handleNewUser}
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #1ba1d9 100%)',
                      }
                    }}
                  >
                    Add User
                  </Button>
                </Stack>
              </Stack>

              {/* Search and Filter Section */}
              <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  size="small"
                  placeholder="Search users..."
                  variant="outlined"
                  sx={{ 
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                />
                <TextField
                  size="small"
                  select
                  placeholder="Filter by role"
                  variant="outlined"
                  sx={{ 
                    width: 200,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <FilterListIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="adviser">Adviser</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
                </TextField>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      backgroundColor: 'grey.50',
                      '& th': {
                        fontWeight: 'bold',
                        color: 'text.primary',
                        borderBottom: '2px solid',
                        borderColor: 'divider',
                        py: 2,
                      }
                    }}>
                      <TableCell>User</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Login</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow 
                        key={user.id} 
                        hover
                        sx={{ 
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                          '& td': {
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                          }
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                              src={user.avatar} 
                              sx={{ 
                                width: 40, 
                                height: 40,
                                border: '2px solid',
                                borderColor: getStatusColor(user.status) === 'success' ? 'success.main' :
                                          getStatusColor(user.status) === 'error' ? 'error.main' :
                                          'warning.main',
                                boxShadow: 1,
                              }}
                            >
                              {user.name[0]}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {user.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            size="small"
                            sx={{ 
                              borderRadius: 1,
                              textTransform: 'capitalize',
                              backgroundColor: user.role === 'admin' ? 'primary.light' :
                                           user.role === 'adviser' ? 'secondary.light' :
                                           'grey.100',
                              color: user.role === 'admin' ? 'primary.dark' :
                                    user.role === 'adviser' ? 'secondary.dark' :
                                    'text.secondary',
                              fontWeight: 500,
                              '& .MuiChip-label': {
                                px: 1.5,
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            color={getStatusColor(user.status)}
                            size="small"
                            sx={{ 
                              borderRadius: 1,
                              textTransform: 'capitalize',
                              fontWeight: 500,
                              '& .MuiChip-label': {
                                px: 1.5,
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {user.lastLogin}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Joined {user.joinDate}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="Edit User">
                              <IconButton
                                size="small"
                                onClick={() => handleEditUser(user)}
                                sx={{ 
                                  '&:hover': { 
                                    backgroundColor: 'primary.light',
                                    color: 'white'
                                  }
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}>
                              <IconButton
                                size="small"
                                onClick={() => handleToggleUserStatus(user.id)}
                                sx={{ 
                                  '&:hover': { 
                                    backgroundColor: user.status === 'active' ? 'error.light' : 'success.light',
                                    color: 'white'
                                  }
                                }}
                              >
                                {user.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete User">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteUser(user.id)}
                                sx={{ 
                                  '&:hover': { 
                                    backgroundColor: 'error.light',
                                    color: 'white'
                                  }
                                }}
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

              {/* Pagination */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mt: 3,
                pt: 2,
                borderTop: 1,
                borderColor: 'divider'
              }}>
                <Typography variant="body2" color="text.secondary">
                  Showing 1 to 3 of 150 entries
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ChevronLeftIcon />}
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 2,
                      borderColor: 'grey.300',
                      '&:hover': {
                        borderColor: 'grey.400',
                        backgroundColor: 'grey.50',
                      }
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    endIcon={<ChevronRightIcon />}
                    sx={{ 
                      textTransform: 'none',
                      borderRadius: 2,
                      borderColor: 'grey.300',
                      '&:hover': {
                        borderColor: 'grey.400',
                        backgroundColor: 'grey.50',
                      }
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          {/* System Activity */}
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                System Activity
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
                      <Chip
                        label={activity.severity}
                        color={
                          activity.severity === 'high'
                            ? 'error'
                            : activity.severity === 'medium'
                            ? 'warning'
                            : 'success'
                        }
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                System Status
              </Typography>
              <List>
                <ListItem sx={{ 
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}>
                  <ListItemIcon>
                    <SettingsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Last Backup"
                    secondary={systemStats.lastBackup}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem sx={{ 
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}>
                  <ListItemIcon>
                    <SecurityIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Security Status"
                    secondary="All systems operational"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem sx={{ 
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}>
                  <ListItemIcon>
                    <AssessmentIcon color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="System Health"
                    secondary="Good"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* New User Dialog */}
      <Dialog 
        open={openNewUser} 
        onClose={() => setOpenNewUser(false)}
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
          <PersonAddIcon />
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            {/* Profile Picture Section */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 2
            }}>
              <Avatar
                src={selectedUser?.avatar}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  border: '3px solid',
                  borderColor: 'primary.main',
                  boxShadow: 2,
                }}
              >
                {selectedUser?.name?.[0] || '?'}
              </Avatar>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: 'grey.300',
                  '&:hover': {
                    borderColor: 'grey.400',
                    backgroundColor: 'grey.50',
                  }
                }}
              >
                Change Photo
              </Button>
            </Box>

            {/* Form Fields */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  defaultValue={selectedUser?.name?.split(' ')[0]}
                  variant="outlined"
                  placeholder="Enter first name"
                  InputProps={{
                    startAdornment: (
                      <PersonIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  defaultValue={selectedUser?.name?.split(' ')[1]}
                  variant="outlined"
                  placeholder="Enter last name"
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
                  label="Email Address"
                  defaultValue={selectedUser?.email}
                  variant="outlined"
                  placeholder="Enter user's email address"
                  InputProps={{
                    startAdornment: (
                      <EmailIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Role"
                  defaultValue={selectedUser?.role || 'client'}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <SecurityIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                >
                  <MenuItem value="admin">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SecurityIcon color="primary" />
                      <Typography>Admin</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="adviser">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PeopleIcon color="secondary" />
                      <Typography>Adviser</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="client">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PersonIcon color="action" />
                      <Typography>Client</Typography>
                    </Stack>
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  defaultValue={selectedUser?.status || 'active'}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <CheckCircleIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                >
                  <MenuItem value="active">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CheckCircleIcon color="success" />
                      <Typography>Active</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="inactive">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <BlockIcon color="error" />
                      <Typography>Inactive</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem value="pending">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <WarningIcon color="warning" />
                      <Typography>Pending</Typography>
                    </Stack>
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* Additional Information */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Additional Information
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                placeholder="Add any additional notes about the user"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <EditIcon color="action" sx={{ mr: 1, mt: 1 }} />
                  ),
                }}
              />
            </Box>
          </Stack>
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
            onClick={() => setOpenNewUser(false)}
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
            onClick={() => setOpenNewUser(false)}
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
            {selectedUser ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* System Settings Dialog */}
      <Dialog 
        open={openSettings} 
        onClose={() => setOpenSettings(false)}
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
          <SettingsIcon />
          System Settings
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Automatic Backups"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Email Notifications"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Two-Factor Authentication"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Backup Frequency"
                select
                defaultValue="daily"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <BackupIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </TextField>
            </Grid>
          </Grid>
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
            onClick={() => setOpenSettings(false)}
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
            onClick={() => setOpenSettings(false)}
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
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
export {}; 