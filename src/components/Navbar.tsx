import { Link as RouterLink } from "react-router";
import { AppBar, Toolbar, Typography, Button, Box, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            Forum App
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
