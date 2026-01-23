import { login } from "../api/auth.api";

export function useAuth() {
  async function signIn(username: string, password: string) {
    const response = await login(username, password);
    localStorage.setItem("token", response.token);
    return response;
  }

  function signOut() {
    localStorage.removeItem("token");
  }

  function isAuthenticated() {
    return Boolean(localStorage.getItem("token"));
  }

  return {
    signIn,
    signOut,
    isAuthenticated,
  };
}
