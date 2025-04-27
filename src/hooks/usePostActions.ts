import { useState, useEffect } from "react";
import { Post } from "../types";
import { useNavigate } from "react-router";
import { deletePost } from "../services/api";
import {
  removeFromFavorites,
  addToFavorites,
  getFavorites,
} from "../utils/favorites";
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  getPostInteractions,
} from "../utils/interactions";

interface UsePostActionsReturn {
  isFavorite: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  post: Post;
  handleLike: () => void;
  handleDislike: () => void;
  handleDelete: () => Promise<void>;
  handleViewDetails: () => void;
  handleFavorite: () => void;
}

export const usePostActions = (
  post: Post,
  onDelete?: (postId: number) => void
): UsePostActionsReturn => {
  const [isFavorite, setIsFavorite] = useState(
    getFavorites().includes(post.id)
  );
  const [interactions, setInteractions] = useState({
    isLiked: false,
    isDisliked: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setInteractions(getPostInteractions(post.id));
  }, [post.id]);

  const handleLike = () => {
    if (interactions.isLiked) {
      removeLike(post.id);
      setInteractions((prev) => ({
        ...prev,
        isLiked: false,
        likesCount: 0,
      }));
    } else {
      addLike(post.id);
      setInteractions((prev) => ({
        ...prev,
        isLiked: true,
        isDisliked: false,
        likesCount: 1,
        dislikesCount: 0,
      }));
    }
  };

  const handleDislike = () => {
    if (interactions.isDisliked) {
      removeDislike(post.id);
      setInteractions((prev) => ({
        ...prev,
        isDisliked: false,
        dislikesCount: 0,
      }));
    } else {
      addDislike(post.id);
      setInteractions((prev) => ({
        ...prev,
        isDisliked: true,
        isLiked: false,
        dislikesCount: 1,
        likesCount: 0,
      }));
    }
  };

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
    if (isFavorite) {
      removeFromFavorites(post.id);
    } else {
      addToFavorites(post.id);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      removeFromFavorites(post.id);
      if (onDelete) {
        onDelete(post.id);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleViewDetails = () => {
    navigate(`/post/${post.id}`);
  };

  return {
    isFavorite,
    isLiked: interactions.isLiked,
    isDisliked: interactions.isDisliked,
    post,
    handleLike,
    handleDislike,
    handleDelete,
    handleViewDetails,
    handleFavorite,
  };
};
