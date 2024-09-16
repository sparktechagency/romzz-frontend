export const setToLocalStorage = (key: any, value: any) => { 
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, value);
  }
  return null;
};

export const getFromLocalStorage = (key: any) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};
