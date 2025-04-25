import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Post } from "../types";

interface PostActionsProps {
  post: Post;
  onLike: () => void;
  onDislike: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  onLike,
  onDislike,
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
    </Box>
  );
};

export default PostActions;
