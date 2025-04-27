import { useState } from "react";
import { Post } from "../types";
import { useNavigate } from "react-router";
import { deletePost } from "../services/api";
import { removeFromFavorites, addToFavorites } from "../utils/favorites";

interface UsePostActionsReturn {
  isFavorite: boolean;
  post: Post;
  handleLike: () => void;
  handleDislike: () => void;
  handleDelete: () => Promise<void>;
  handleViewDetails: () => void;
  handleFavorite: () => void;
}

export const usePostActions = (
  initialPost: Post,
  onDelete?: (postId: number) => void
): UsePostActionsReturn => {
  const [post, setPost] = useState<Post>(initialPost);
  const [isFavorite, setIsFavorite] = useState(initialPost.isFavorite);
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

  const handleFavorite = () => {
    setIsFavorite((prevPost) => !prevPost);
    if (isFavorite) {
      removeFromFavorites(post.id);
    } else {
      addToFavorites(post.id);
    }
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
    isFavorite,
    post,
    handleLike,
    handleDislike,
    handleDelete,
    handleViewDetails,
    handleFavorite,
  };
};
