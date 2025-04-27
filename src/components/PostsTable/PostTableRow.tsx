import React from "react";
import { TableRow, TableCell, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post, User } from "../../types";
import { usePostActions } from "../../hooks/usePostActions";
import PostActions from "./PostActions";

interface PostTableRowProps {
  post: Post;
  user: User;
  onDelete: (postId: number) => void;
}

const PostTableRow: React.FC<PostTableRowProps> = ({
  post,
  user,
  onDelete,
}) => {
  const {
    isFavorite,
    post: currentPost,
    handleLike,
    handleDislike,
    handleDelete: handlePostDelete,
    handleViewDetails,
    handleFavorite,
  } = usePostActions(post, onDelete);

  return (
    <TableRow>
      <TableCell>
        <Typography
          variant="body1"
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
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell align="center">
        <PostActions
          post={currentPost}
          onLike={handleLike}
          onDislike={handleDislike}
          isFavorite={isFavorite}
          onFavorite={handleFavorite}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={handlePostDelete} color="error" size="small">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PostTableRow;
