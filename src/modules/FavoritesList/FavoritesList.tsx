import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Button } from "@mui/material";
import { Post } from "../../types";
import Loader from "../../components/Loader";
import { getFavorites } from "../../utils/favorites";
import { useGetPostsUsersQuery } from "../../hooks/useGetPostsUsersQuery";
import { PostsTable } from "../../components/PostsTable";
import { PostsLayout } from "../../components/PostsLayout";

const FavoritesList: React.FC = () => {
  const navigate = useNavigate();
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);
  const { posts, users, isLoading, setPosts } = useGetPostsUsersQuery();

  useEffect(() => {
    setFavoritePosts(posts.filter((post) => getFavorites().includes(post.id)));
  }, [posts]);

  const handleDelete = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
    setFavoritePosts(favoritePosts.filter((post) => post.id !== postId));
  };

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
    <PostsLayout
      title="Favorite Posts"
      headerActions={
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back to All Posts
        </Button>
      }
    >
      <PostsTable posts={favoritePosts} users={users} onDelete={handleDelete} />
    </PostsLayout>
  );
};

export default FavoritesList;
