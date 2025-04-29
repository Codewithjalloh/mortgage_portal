import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import MortgageApplicationForm from './components/mortgage/MortgageApplicationForm';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import CreateCase from './components/cases/CreateCase';
import ClientDashboard from './components/client/ClientDashboard';
import ClientProfile from './components/client/ClientProfile';
import ClientCases from './components/client/ClientCases';
import CaseDetails from './components/client/CaseDetails';
import MortgageEnquiryForm from './components/mortgage/MortgageEnquiryForm';
import AdviserDashboard from './components/adviser/AdviserDashboard';
import AdviserProfile from './components/adviser/AdviserProfile';
import AdviserCases from './components/adviser/AdviserCases';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import SystemSettings from './components/admin/SystemSettings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Simple auth check - replace with proper authentication
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Get user type from localStorage
const getUserType = () => {
  return localStorage.getItem('userType');
};

interface ProtectedRouteProps {
  children: React.ReactNode | (() => React.ReactNode);
  allowedRoles?: string[];
}

// Protected Route wrapper with role check
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles) {
    const userType = getUserType();
    if (!userType || !allowedRoles.includes(userType)) {
      return <Navigate to="/" />;
    }
  }

  const content = typeof children === 'function' ? children() : children;
  return <>{content}</>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Client Routes */}
          <Route
            path="/client"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="create-case" element={<CreateCase />} />
            <Route path="cases" element={<ClientCases />} />
            <Route path="case/:id" element={<CaseDetails />} />
            <Route path="new-enquiry" element={<MortgageEnquiryForm />} />
          </Route>

          {/* Adviser Routes */}
          <Route
            path="/adviser"
            element={
              <ProtectedRoute allowedRoles={['adviser']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdviserDashboard />} />
            <Route path="cases" element={<AdviserCases />} />
            <Route path="profile" element={<AdviserProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>

          {/* Default Route - Redirect based on user type */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {() => {
                  const userType = getUserType();
                  return <Navigate to={`/${userType}`} />;
                }}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 