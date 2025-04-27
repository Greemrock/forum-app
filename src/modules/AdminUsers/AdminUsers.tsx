import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "../../types";
import { getUsers, updateUser } from "../../services/api";
import Loader from "../../components/Loader";
import { PostsLayout } from "../../components/PostsLayout";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(true);
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditData(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setEditData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "isAdmin" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (selectedUser) {
      try {
        await updateUser(selectedUser.id, editData);
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? { ...user, ...editData } : user
          )
        );
        handleCloseDialog();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <>
      <PostsLayout title="User Management">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(user)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PostsLayout>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editData.name || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={editData.email || ""}
            onChange={handleChange}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={!!editData.isAdmin}
                onChange={handleChange}
                name="isAdmin"
              />
            }
            label="Admin"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminUsers;
