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


interface IResultProps{
  children: React.ReactNode
} 

export const logEvent = (name:any) => (event:any) => {};
export const Result: React.FC<IResultProps> = ({children}) => <div className="result">{children}</div>;
