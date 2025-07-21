import Cookies from "js-cookie";

// Simple method to get auth token from cookies using js-cookie
export function getYourAuthToken(): string {
  const token =
    Cookies.get("token") ||
    Cookies.get("authToken") ||
    Cookies.get("access_token") ||
    Cookies.get("jwt") ||
    Cookies.get("auth_token") ||
    "";

  return token;
}

// Method with error handling
export function getAuthTokenSafe(): string | null {
  try {
    return getYourAuthToken() || null;
  } catch (error) {
    console.error("Error getting auth token from cookies:", error);
    return null;
  }
}

// Method that throws error if no token found
export function getAuthTokenRequired(): string {
  const token = getYourAuthToken();

  if (!token) {
    throw new Error("Authentication token not found in cookies");
  }

  return token;
}

// Method with Bearer prefix
export function getAuthTokenWithBearer(): string {
  const token = getYourAuthToken();

  if (!token) {
    return "";
  }

  return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
}
