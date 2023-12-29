import { jwtDecode } from 'jwt-decode';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage-keys';

export const getAccessToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  if(!token) return null;

  const decodedToken = jwtDecode(token);
  // if(decodedToken)

  return token;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  return token;
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, token);
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  window.location.reload();
};
