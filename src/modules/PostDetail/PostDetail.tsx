import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Typography, Button, Box } from "@mui/material";
import { Post, Comment, User } from "../../types";
import { getPost, getComments, getUser, deletePost } from "../../services/api";
import Loader from "../../components/Loader";
import PostDetailCard from "./PostDetailCard";
import CommentsList from "./CommentsList";
import { getFavorites } from "../../utils/favorites";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async () => {
    if (post) {
      await deletePost(post.id);
      navigate("/");
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && post) {
      const comment: Comment = {
        id: comments.length + 1,
        postId: post.id,
        name: "Current User",
        email: "user@example.com",
        body: newComment,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (postId) {
          const [postData, commentsData] = await Promise.all([
            getPost(parseInt(postId)),
            getComments(parseInt(postId)),
          ]);
          const isFavorite = getFavorites().includes(postData.id);
          const userData = await getUser(postData.userId);

          setPost({
            ...postData,
            isFavorite,
          });
          setComments(commentsData);
          setUser(userData);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!post || !user) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Post not found
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Back to Posts
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back to Posts
      </Button>

      <PostDetailCard post={post} user={user} onDelete={handleDelete} />

      <CommentsList
        comments={comments}
        newComment={newComment}
        onCommentChange={setNewComment}
        onAddComment={handleAddComment}
      />
    </Box>
  );
};

export default PostDetail;
