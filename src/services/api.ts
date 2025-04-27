import axios from "axios";
import { Post, Comment, User } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data.map((post: Post) => ({
    ...post,
    likes: 0,
    dislikes: 0,
    isFavorite: false,
  }));
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return {
    ...response.data,
    likes: 0,
    dislikes: 0,
    isFavorite: false,
  };
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/users/${userId}/posts`);
  return response.data.map((post: Post) => ({
    ...post,
    likes: 0,
    dislikes: 0,
    isFavorite: false,
  }));
};

export const createPost = async (
  post: Omit<Post, "id" | "isFavorite">
): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return {
    ...response.data,
    likes: 0,
    dislikes: 0,
    isFavorite: false,
  };
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/posts/${id}`);
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  const response = await axios.patch(`${API_URL}/users/${id}`, userData);
  return response.data;
};

export const updatePost = async (
  id: number,
  postData: Partial<Post & { priority: number }>
): Promise<Post> => {
  const response = await axios.patch(`${API_URL}/posts/${id}`, postData);
  return response.data;
};
