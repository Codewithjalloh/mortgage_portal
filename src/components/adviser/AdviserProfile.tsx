import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
  Work as WorkIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AdviserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
  department: string;
  employeeId: string;
  joinDate: string;
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  securityQuestions: {
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
  };
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  role: Yup.string().required('Role is required'),
  department: Yup.string().required('Department is required'),
});

const AdviserProfile: React.FC = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openTwoFactorDialog, setOpenTwoFactorDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [profile, setProfile] = useState<AdviserProfile>({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+44 123 456 7890',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Mortgage Adviser',
    department: 'Mortgage Services',
    employeeId: 'EMP001',
    joinDate: '2023-01-15',
    twoFactorEnabled: false,
    lastPasswordChange: '2024-02-15',
    securityQuestions: {
      question1: 'What was your first school?',
      answer1: 'St. Mary\'s',
      question2: 'What is your mother\'s maiden name?',
      answer2: 'Johnson',
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,
      department: profile.department,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setProfile({ ...profile, ...values });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  const handlePasswordChange = () => {
    setOpenPasswordDialog(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleTwoFactorToggle = () => {
    setProfile({ ...profile, twoFactorEnabled: !profile.twoFactorEnabled });
    setOpenTwoFactorDialog(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Changes saved successfully!
        </Alert>
      )}
      {showError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          An error occurred. Please try again.
        </Alert>
      )}

      {/* Profile Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profile.avatar}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            >
              {profile.firstName[0]}{profile.lastName[0]}
            </Avatar>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
            >
              Change Photo
            </Button>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {profile.role}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Chip
                icon={<VerifiedUserIcon />}
                label="Verified Adviser"
                color="success"
                size="small"
              />
              <Chip
                icon={<SecurityIcon />}
                label="Security Level: High"
                color="primary"
                size="small"
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Personal Information
              </Typography>
              <IconButton onClick={() => formik.handleSubmit()}>
                <EditIcon />
              </IconButton>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>

          {/* Professional Information */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Professional Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Department"
                  secondary={profile.department}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Employee ID"
                  secondary={profile.employeeId}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Join Date"
                  secondary={profile.joinDate}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Password"
                  secondary={`Last changed: ${profile.lastPasswordChange}`}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenPasswordDialog(true)}
                >
                  Change Password
                </Button>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security to your account"
                />
                <Switch
                  checked={profile.twoFactorEnabled}
                  onChange={() => setOpenTwoFactorDialog(true)}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Security Questions"
                  secondary="Manage your security questions"
                />
                <Button
                  variant="outlined"
                  size="small"
                >
                  Edit
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePasswordChange}>
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Two-Factor Authentication Dialog */}
      <Dialog open={openTwoFactorDialog} onClose={() => setOpenTwoFactorDialog(false)}>
        <DialogTitle>Two-Factor Authentication</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {profile.twoFactorEnabled
              ? 'Are you sure you want to disable two-factor authentication?'
              : 'Enable two-factor authentication to add an extra layer of security to your account.'}
          </Typography>
          {!profile.twoFactorEnabled && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                How it works:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Receive a code via SMS or authenticator app" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Enter the code when logging in" />
                </ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTwoFactorDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={profile.twoFactorEnabled ? 'error' : 'primary'}
            onClick={handleTwoFactorToggle}
          >
            {profile.twoFactorEnabled ? 'Disable' : 'Enable'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdviserProfile; 