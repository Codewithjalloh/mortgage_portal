import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Alert,
  Stack,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

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

interface UserManagementProps {
  onUserUpdate?: (user: User) => void;
  onUserDelete?: (userId: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onUserUpdate, onUserDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof User>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user =>
        user.id === selectedUser.id ? selectedUser : user
      ));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      // Add new user
      const newUser: User = {
        id: `USR${users.length + 1}`,
        name: '',
        email: '',
        role: 'client',
        status: 'pending',
        lastLogin: new Date().toISOString(),
        joinDate: new Date().toISOString(),
      };
      setUsers([...users, newUser]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    handleCloseDialog();
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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'name') {
      return isAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    
    // Handle other fields with proper type checking
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    
    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    return isAsc
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
        ? 1
        : -1;
  });

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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New User
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? order : 'asc'}
                  onClick={() => handleSort('role')}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'lastLogin'}
                  direction={orderBy === 'lastLogin' ? order : 'asc'}
                  onClick={() => handleSort('lastLogin')}
                >
                  Last Login
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={user.avatar} sx={{ width: 32, height: 32 }}>
                        {user.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={user.status === 'active' ? 'Deactivate' : 'Activate'}>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleUserStatus(user.id)}
                        >
                          {user.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(user.id)}
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              defaultValue={selectedUser?.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              defaultValue={selectedUser?.email}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Role"
              defaultValue={selectedUser?.role || 'client'}
              margin="normal"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="adviser">Adviser</MenuItem>
              <MenuItem value="client">Client</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Status"
              defaultValue={selectedUser?.status || 'pending'}
              margin="normal"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveUser}>
            {selectedUser ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 