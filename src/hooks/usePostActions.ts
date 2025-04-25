import { useState } from "react";
import { Post } from "../types";
import { useNavigate } from "react-router";
import { deletePost } from "../services/api";

export const usePostActions = (
  initialPost: Post,
  onDelete?: (postId: number) => void
) => {
  const [post, setPost] = useState<Post>(initialPost);
  const navigate = useNavigate();

  const handleLike = () => {
    setPost((prevPost) => ({
      ...prevPost,
      likes: prevPost.likes + 1,
    }));
  };

  const handleDislike = () => {
    setPost((prevPost) => ({
      ...prevPost,
      dislikes: prevPost.dislikes + 1,
    }));
  };

  const handleDelete = async () => {
    await deletePost(post.id);
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const handleViewDetails = () => {
    navigate(`/post/${post.id}`);
  };

  return {
    post,
    handleLike,
    handleDislike,
    handleDelete,
    handleViewDetails,
  };
};
