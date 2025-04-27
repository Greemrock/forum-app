import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  TextField,
  Button,
} from "@mui/material";
import type { Comment } from "../../types";

interface CommentsListProps {
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onAddComment: () => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  newComment,
  onCommentChange,
  onAddComment,
}) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Add a comment..."
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={onAddComment}
          disabled={!newComment.trim()}
        >
          Add Comment
        </Button>
      </Box>

      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <ListItem>
              <ListItemText
                primary={comment.name}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {comment.email}
                    </Typography>
                    <Typography variant="body1">{comment.body}</Typography>
                  </>
                }
              />
            </ListItem>
            {index < comments.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default CommentsList;
