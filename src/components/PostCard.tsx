import React, { memo } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post, User } from "../types";
import { usePostActions } from "../hooks/usePostActions";
import PostActions from "./PostActions";

interface PostCardProps {
  post: Post;
  user: User;
  onDelete?: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = memo(({ post, user, onDelete }) => {
  const {
    isFavorite,
    post: currentPost,
    handleLike,
    handleDislike,
    handleDelete,
    handleViewDetails,
    handleFavorite,
  } = usePostActions(post, onDelete);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Posted by {user.name}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
          onClick={handleViewDetails}
        >
          {currentPost.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {currentPost.body}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PostActions
            post={post}
            onLike={handleLike}
            onDislike={handleDislike}
            isFavorite={isFavorite}
            onFavorite={handleFavorite}
          />

          {onDelete && (
            <IconButton onClick={handleDelete} sx={{ ml: "auto" }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default PostCard;

