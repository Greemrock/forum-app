import React from "react";
import { Link as RouterLink } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  FormControlLabel,
  Switch,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAdmin } from "../context/AdminContext";

const Navbar: React.FC = () => {
  const { isAdmin, toggleAdmin } = useAdmin();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            Forum App
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isAdmin && (
            <>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                startIcon={<AdminPanelSettingsIcon />}
              >
                Admin Panel
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={RouterLink}
                  to="/admin/users"
                  onClick={handleMenuClose}
                >
                  Manage Users
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/admin/posts"
                  onClick={handleMenuClose}
                >
                  Manage Posts
                </MenuItem>
              </Menu>
            </>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={toggleAdmin}
                color="secondary"
              />
            }
            label="Admin Mode"
          />

          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/favorites"
            startIcon={<FavoriteIcon />}
          >
            Favorites
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile">
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
