import Cookies from "js-cookie";

export const AUTH_COOKIE_NAME = "portal_token";
export const HARDCODED_CREDENTIALS = {
  username: "admin",
  password: "password123",
  accessToken: "dummy-access-token-12345",
};

export const login = (username: string, password: string): boolean => {
  if (
    username === HARDCODED_CREDENTIALS.username &&
    password === HARDCODED_CREDENTIALS.password
  ) {
    Cookies.set(AUTH_COOKIE_NAME, HARDCODED_CREDENTIALS.accessToken, {
      expires: 1,
    });
    return true;
  }
  return false;
};

export const logout = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  return !!Cookies.get(AUTH_COOKIE_NAME);
};
