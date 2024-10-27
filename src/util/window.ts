export const isBrowser = () => typeof window !== undefined;

export const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    return null;
  }
};
