import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";
import { AdminProvider } from "./context";
import { PostsList } from "./modules/PostsList";
import { FavoritesList } from "./modules/FavoritesList";
import { CreatePost } from "./modules/CreatePost";
import { PostDetail } from "./modules/PostDetail";
import { UserProfile } from "./modules/UserProfile";
import { AdminPosts } from "./modules/AdminPosts";
import { AdminUsers } from "./modules/AdminUsers";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
