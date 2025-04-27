import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Post, User } from "../../types";
import { getPosts, updatePost, getUsers } from "../../services/api";
import Loader from "../../components/Loader";
import { PostsLayout } from "../../components/PostsLayout";

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [isLoading, setIsLoading] = useState(true);

  const sortedPosts = [...posts].sort((a, b) => {
    const priorityA = a.priority || 0;
    const priorityB = b.priority || 0;
    return priorityB - priorityA;
  });

  const handlePriorityChange = async (postId: number, newPriority: number) => {
    const validatedPriority = Math.max(0, newPriority);

    try {
      await updatePost(postId, { priority: validatedPriority });
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, priority: validatedPriority } : post
        )
      );
    } catch (error) {
      console.error("Error updating post priority:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postsData, usersData] = await Promise.all([
          getPosts(),
          getUsers(),
        ]);
        setPosts(postsData);
        setUsers(
          usersData.reduce(
            (acc: Record<number, User>, user: User) => ({
              ...acc,
              [user.id]: user,
            }),
            {}
          )
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <PostsLayout title="Post Priority Management">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Priority</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPosts.map((post, index) => {
              const priority = post.priority || 0;

              return (
                <TableRow key={post.id}>
                  <TableCell>
                    <TextField
                      type="number"
                      value={priority}
                      onChange={(e) =>
                        handlePriorityChange(post.id, Number(e.target.value))
                      }
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{users[post.userId]?.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handlePriorityChange(post.id, priority + 1)
                      }
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handlePriorityChange(post.id, priority - 1)
                      }
                      disabled={index === posts.length - 1 || priority <= 0}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </PostsLayout>
  );
};

export default AdminPosts;
