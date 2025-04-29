import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  LinearProgress
} from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Your Mortgage Portal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your mortgage application progress and manage your documents all in one place.
            </Typography>
          </Paper>
        </Grid>

        {/* Application Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Application Status" />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                Current Stage: Document Review
              </Typography>
              <LinearProgress variant="determinate" value={60} sx={{ mt: 2 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                60% Complete
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Required Documents */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Required Documents" />
            <CardContent>
              <Typography variant="body2" paragraph>
                ✓ Proof of Income
              </Typography>
              <Typography variant="body2" paragraph>
                ✓ Bank Statements
              </Typography>
              <Typography variant="body2" paragraph>
                □ Property Appraisal
              </Typography>
              <Typography variant="body2" paragraph>
                □ Insurance Documentation
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Recent Activity" />
            <CardContent>
              <Typography variant="body2" paragraph>
                • Document uploaded: Bank Statement - 2 days ago
              </Typography>
              <Typography variant="body2" paragraph>
                • Application status updated - 3 days ago
              </Typography>
              <Typography variant="body2" paragraph>
                • New message from loan officer - 5 days ago
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 