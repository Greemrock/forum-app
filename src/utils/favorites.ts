const FAVORITES_KEY = "favoriteIds";

export const getFavorites = (): number[] => {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const addToFavorites = (postId: number): void => {
  const favorites = getFavorites();
  if (!favorites.includes(postId)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, postId]));
  }
};

export const removeFromFavorites = (postId: number): void => {
  const favorites = getFavorites();
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites.filter((id) => id !== postId))
  );
};

export const isFavorite = (postId: number): boolean => {
  const favorites = getFavorites();
  return favorites.includes(postId);
};
