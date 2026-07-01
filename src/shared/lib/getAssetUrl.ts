export const getAssetUrl = (path: string) => {
  return path.startsWith("http") ? path : `${import.meta.env.VITE_API_URL}api${path}`;
};
