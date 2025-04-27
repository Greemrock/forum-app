import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post, User } from "../../types";
import PostActions from "../../components/PostsTable/PostActions";
import { usePostActions } from "../../hooks/usePostActions";

interface PostDetailCardProps {
  post: Post;
  user: User;
  onDelete?: () => void;
}

const PostDetailCard: React.FC<PostDetailCardProps> = ({
  post,
  user,
  onDelete,
}) => {
  const {
    isLiked,
    isDisliked,
    post: currentPost,
    isFavorite,
    handleLike,
    handleDislike,
    handleFavorite,
    handleDelete,
  } = usePostActions(post, onDelete);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              {currentPost.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Posted by: {user.name}
            </Typography>
          </Box>
          <IconButton
            onClick={handleDelete}
            color="error"
            size="small"
            sx={{ mt: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {currentPost.body}
        </Typography>
        <PostActions
          post={currentPost}
          onLike={handleLike}
          onDislike={handleDislike}
          onFavorite={handleFavorite}
          isFavorite={isFavorite}
          isLiked={isLiked}
          isDisliked={isDisliked}
        />
      </CardContent>
    </Card>
  );
};

export default PostDetailCard;
