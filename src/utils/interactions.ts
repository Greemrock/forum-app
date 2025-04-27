interface PostInteractions {
  likes: number[];
  dislikes: number[];
}

const INTERACTIONS_KEY = "post_interactions";

export const getInteractions = (): PostInteractions => {
  const stored = localStorage.getItem(INTERACTIONS_KEY);
  if (!stored) {
    return { likes: [], dislikes: [] };
  }
  return JSON.parse(stored);
};

const saveInteractions = (interactions: PostInteractions) => {
  localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(interactions));
};

export const getPostInteractions = (postId: number) => {
  const interactions = getInteractions();

  return {
    isLiked: interactions.likes.includes(postId),
    isDisliked: interactions.dislikes.includes(postId),
  };
};

export const addLike = (postId: number) => {
  const interactions = getInteractions();
  const dislikeIndex = interactions.dislikes.indexOf(postId);
  if (dislikeIndex !== -1) {
    interactions.dislikes.splice(dislikeIndex, 1);
  }

  if (!interactions.likes.includes(postId)) {
    interactions.likes.push(postId);
  }
  saveInteractions(interactions);
};

export const removeLike = (postId: number) => {
  const interactions = getInteractions();
  const index = interactions.likes.indexOf(postId);
  if (index !== -1) {
    interactions.likes.splice(index, 1);
    saveInteractions(interactions);
  }
};

export const addDislike = (postId: number) => {
  const interactions = getInteractions();
  const likeIndex = interactions.likes.indexOf(postId);

  if (likeIndex !== -1) {
    interactions.likes.splice(likeIndex, 1);
  }

  if (!interactions.dislikes.includes(postId)) {
    interactions.dislikes.push(postId);
  }
  saveInteractions(interactions);
};

export const removeDislike = (postId: number) => {
  const interactions = getInteractions();
  const index = interactions.dislikes.indexOf(postId);
  if (index !== -1) {
    interactions.dislikes.splice(index, 1);
    saveInteractions(interactions);
  }
};
