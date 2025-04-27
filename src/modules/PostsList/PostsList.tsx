import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Loader from "../../components/Loader";
import { useGetPostsUsersQuery } from "../../hooks/useGetPostsUsersQuery";
import { PostsTable } from "../../components/PostsTable";
import { PostsLayout } from "../../components/PostsLayout";

const PostsList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const { posts, users, isLoading, setPosts } = useGetPostsUsersQuery();

  const filteredPosts = useMemo(() => {
    return selectedUser
      ? posts.filter((post) => post.userId === selectedUser)
      : posts;
  }, [posts, selectedUser]);

  const handleDelete = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <PostsLayout
      title="Posts"
      headerActions={
        <Button variant="contained" onClick={() => navigate("/create-post")}>
          Create New Post
        </Button>
      }
    >
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Filter by User</InputLabel>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value as number)}
          label="Filter by User"
        >
          <MenuItem value="">All Users</MenuItem>
          {Object.values(users).map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <PostsTable posts={filteredPosts} users={users} onDelete={handleDelete} />
    </PostsLayout>
  );
};

export default PostsList;

