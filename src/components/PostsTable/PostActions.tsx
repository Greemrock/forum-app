import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Post } from "../../types";

interface PostActionsProps {
  post: Post;
  isFavorite: boolean;
  onLike: () => void;
  onDislike: () => void;
  onFavorite: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  isFavorite,
  post,
  onLike,
  onDislike,
  onFavorite,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={onLike}>
        <ThumbUpIcon />
      </IconButton>
      <Typography variant="caption" sx={{ mx: 1 }}>
        {post.likes}
      </Typography>
      <IconButton onClick={onDislike}>
        <ThumbDownIcon />
      </IconButton>
      <Typography variant="caption" sx={{ mx: 1 }}>
        {post.dislikes}
      </Typography>
      <IconButton onClick={onFavorite}>
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
    </Box>
  );
};

export default PostActions;
