import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
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
        <Typography variant="h5" gutterBottom>
          {currentPost.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Posted by: {user.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {currentPost.body}
        </Typography>
        <PostActions
          post={currentPost}
          onLike={handleLike}
          onDislike={handleDislike}
          onFavorite={handleFavorite}
          isFavorite={isFavorite}
        />
      </CardContent>
    </Card>
  );
};

export default PostDetailCard;
