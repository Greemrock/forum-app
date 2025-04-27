import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Button, Grid } from "@mui/material";
import PostCard from "./PostCard";
import { Post } from "../types";
import Loader from "./Loader";
import { getFavorites } from "../utils/favorites";
import { useGetPostsUsersQuery } from "../hooks/useGetPostsUsersQuery";

const FavoritesList: React.FC = () => {
  const navigate = useNavigate();
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);
  const { posts, users, isLoading } = useGetPostsUsersQuery();

  useEffect(() => {
    setFavoritePosts(posts.filter((post) => getFavorites().includes(post.id)));
  }, [posts]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (favoritePosts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No favorite posts
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Browse Posts
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Posts
      </Typography>
      <Grid container spacing={3}>
        {favoritePosts.map((post) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <PostCard post={post} user={users[post.userId]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritesList;
