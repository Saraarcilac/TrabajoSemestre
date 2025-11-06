import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  username: string;
  role: "admin" | "slave" | "developer";
  exp?: number;
}

export function getUserFromToken() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // Si el token expiró, lo borramos
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded;
  } catch (err) {
    console.error("❌ Error decodificando token:", err);
    localStorage.removeItem("token");
    return null;
  }
}
