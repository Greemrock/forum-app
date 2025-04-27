import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { User } from "../../types";
import { getUser, updateUser } from "../../services/api";
import Loader from "../../components/Loader";

const GRID_SIZE = { xs: 12, sm: 6 };

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (user) {
        await updateUser(user.id, formData);
        setUser({ ...user, ...formData });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser(1);
        setUser(userData);
        setFormData(userData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!user) return null;

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5">User Profile</Typography>
            <Button
              variant="contained"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid size={GRID_SIZE}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid size={GRID_SIZE}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid size={GRID_SIZE}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid size={GRID_SIZE}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid size={GRID_SIZE}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1">Address</Typography>
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={formData.address?.street}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Suite"
                name="suite"
                value={formData.address?.suite}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.address?.city}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Zipcode"
                name="zipcode"
                value={formData.address?.zipcode}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" gutterBottom>
                Company
              </Typography>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.company?.name}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Catch Phrase"
                name="catchPhrase"
                value={formData.company?.catchPhrase}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Business"
                name="business"
                value={formData.company?.bs}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
          </Grid>

          {isEditing && (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
