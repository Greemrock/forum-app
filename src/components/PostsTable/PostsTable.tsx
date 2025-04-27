import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Post, User } from "../../types";
import PostTableRow from "./PostTableRow";

interface PostsTableProps {
  posts: Post[];
  users: Record<number, User>;
  onDelete: (postId: number) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({ posts, users, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <PostTableRow
              key={post.id}
              post={post}
              user={users[post.userId]}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostsTable;
