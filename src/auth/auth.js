// src/auth.js
import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => {
  const token = getToken();
  return token;
};

export const isAdmin = () => {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.role; // Giả sử quyền hạn được lưu trong thuộc tính 'role' của token
  }
  return false;
};
