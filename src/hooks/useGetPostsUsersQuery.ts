import { useState, useEffect } from "react";
import { Post, User } from "../types";
import { isFavorite } from "../utils/favorites";
import { getPosts, getUsers } from "../services/api";

export const useGetPostsUsersQuery = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postsData, usersData] = await Promise.all([
          getPosts(),
          getUsers(),
        ]);
        setPosts(
          postsData.map((post) => ({
            ...post,
            isFavorite: isFavorite(post.id),
          }))
        );
        setUsers(
          usersData.reduce((acc, user) => ({ ...acc, [user.id]: user }), {})
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    posts,
    users,
    isLoading,
    setPosts,
  };
};
