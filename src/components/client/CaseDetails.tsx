import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Description as DocumentIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface CaseDetails {
  id: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  description: string;
  applicants: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  documents: Array<{
    name: string;
    type: string;
    uploadedAt: string;
  }>;
}

const mockCaseDetails: CaseDetails = {
  id: '1',
  type: 'Mortgage Application',
  status: 'in_progress',
  createdAt: '2024-03-17',
  description: 'First time buyer mortgage application',
  applicants: [
    { name: 'John Doe', email: 'john@example.com', role: 'Primary Applicant' },
    { name: 'Jane Doe', email: 'jane@example.com', role: 'Joint Applicant' },
  ],
  documents: [
    { name: 'ID Proof', type: 'Identity Document', uploadedAt: '2024-03-17' },
    { name: 'Bank Statement', type: 'Financial Document', uploadedAt: '2024-03-17' },
  ],
};

const CaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const caseDetails = mockCaseDetails; // In a real app, fetch based on ID

  const getStatusColor = (status: CaseDetails['status']) => {
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
        <Typography variant="h4">Case Details</Typography>
        <Button variant="contained" color="primary">
          Upload Document
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Case Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Case ID
                </Typography>
                <Typography>{caseDetails.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Type
                </Typography>
                <Typography>{caseDetails.type}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={caseDetails.status.replace('_', ' ')}
                  color={getStatusColor(caseDetails.status)}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created At
                </Typography>
                <Typography>
                  {new Date(caseDetails.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography>{caseDetails.description}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Documents
            </Typography>
            <List>
              {caseDetails.documents.map((doc, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <DocumentIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={`${doc.type} • Uploaded on ${new Date(
                        doc.uploadedAt
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                  {index < caseDetails.documents.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Applicants
            </Typography>
            <List>
              {caseDetails.applicants.map((applicant, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={applicant.name}
                      secondary={`${applicant.role} • ${applicant.email}`}
                    />
                  </ListItem>
                  {index < caseDetails.applicants.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CaseDetails; 