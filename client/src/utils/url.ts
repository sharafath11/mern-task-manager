export const getFileUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path; 
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  return `${baseUrl}${path}`;
};
