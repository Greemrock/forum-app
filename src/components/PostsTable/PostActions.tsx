import React from "react";
import { Stack, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Post } from "../../types";

interface PostActionsProps {
  post: Post;
  isLiked: boolean;
  isDisliked: boolean;
  isFavorite: boolean;
  onLike: () => void;
  onDislike: () => void;
  onFavorite: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  isLiked,
  isDisliked,
  isFavorite,
  onLike,
  onDislike,
  onFavorite,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton
        onClick={onLike}
        color={isLiked ? "primary" : "default"}
        size="small"
      >
        <ThumbUpIcon />
      </IconButton>

      <IconButton
        onClick={onDislike}
        color={isDisliked ? "error" : "default"}
        size="small"
      >
        <ThumbDownIcon />
      </IconButton>

      <IconButton
        onClick={onFavorite}
        color={isFavorite ? "warning" : "default"}
        size="small"
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Stack>
  );
};

export default PostActions;
