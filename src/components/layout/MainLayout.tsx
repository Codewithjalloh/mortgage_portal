import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  useTheme,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Description as DocumentIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Add as AddIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem('userType');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const getMenuItems = () => {
    switch (userType) {
      case 'client':
        return [
          { text: 'Dashboard', icon: <HomeIcon />, path: '/client' },
          { text: 'Create Case', icon: <AddIcon />, path: '/client/create-case' },
          { text: 'My Cases', icon: <DocumentIcon />, path: '/client/cases' },
          { text: 'Profile', icon: <PersonIcon />, path: '/client/profile' },
        ];
      case 'adviser':
        return [
          { text: 'Dashboard', icon: <HomeIcon />, path: '/adviser' },
          { text: 'Cases', icon: <DocumentIcon />, path: '/adviser/cases' },
          { text: 'Profile', icon: <PersonIcon />, path: '/adviser/profile' },
        ];
      case 'admin':
        return [
          { text: 'Dashboard', icon: <HomeIcon />, path: '/admin' },
          { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users' },
          { text: 'System Settings', icon: <SettingsIcon />, path: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Mortgage Portal
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mortgage Portal - {userType?.charAt(0).toUpperCase()}{userType?.slice(1)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout; 