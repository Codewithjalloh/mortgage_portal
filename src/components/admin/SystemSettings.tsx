import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Alert,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Backup as BackupIcon,
  Notifications as NotificationsIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

interface SystemSettings {
  automaticBackups: boolean;
  backupFrequency: string;
  emailNotifications: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  maintenanceMode: boolean;
  systemNotifications: boolean;
  storageLimit: number;
  performanceMode: boolean;
}

const SystemSettings: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [settings, setSettings] = useState<SystemSettings>({
    automaticBackups: true,
    backupFrequency: 'daily',
    emailNotifications: true,
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    maintenanceMode: false,
    systemNotifications: true,
    storageLimit: 1000,
    performanceMode: false,
  });

  const handleSettingChange = (setting: keyof SystemSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save the settings
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}
      {showError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          An error occurred while saving settings.
        </Alert>
      )}

      <Typography variant="h5" gutterBottom>
        System Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Backup Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <BackupIcon color="primary" />
                <Typography variant="h6">Backup Settings</Typography>
              </Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.automaticBackups}
                    onChange={(e) => handleSettingChange('automaticBackups', e.target.checked)}
                  />
                }
                label="Enable Automatic Backups"
              />
              <TextField
                fullWidth
                select
                label="Backup Frequency"
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                margin="normal"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <SecurityIcon color="primary" />
                <Typography variant="h6">Security Settings</Typography>
              </Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                }
                label="Enable Two-Factor Authentication"
              />
              <TextField
                fullWidth
                type="number"
                label="Session Timeout (minutes)"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                margin="normal"
              />
              <TextField
                fullWidth
                type="number"
                label="Maximum Login Attempts"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <NotificationsIcon color="primary" />
                <Typography variant="h6">Notification Settings</Typography>
              </Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                }
                label="Enable Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.systemNotifications}
                    onChange={(e) => handleSettingChange('systemNotifications', e.target.checked)}
                  />
                }
                label="Enable System Notifications"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* System Performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <SpeedIcon color="primary" />
                <Typography variant="h6">System Performance</Typography>
              </Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.performanceMode}
                    onChange={(e) => handleSettingChange('performanceMode', e.target.checked)}
                  />
                }
                label="Enable Performance Mode"
              />
              <TextField
                fullWidth
                type="number"
                label="Storage Limit (GB)"
                value={settings.storageLimit}
                onChange={(e) => handleSettingChange('storageLimit', parseInt(e.target.value))}
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  />
                }
                label="Maintenance Mode"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSaveSettings}
          sx={{ minWidth: 200 }}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default SystemSettings; 