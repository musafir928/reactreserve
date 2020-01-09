const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://personal-project-2.musafir928.now.sh"
    : "http://localhost:3000";

export default baseUrl;
