import jwtDecode from "jwt-decode";

export function getUserRole(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}