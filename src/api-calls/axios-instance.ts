import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  logout,
  setAccessToken,
} from '../utils/auth';
import { jwtDecode } from 'jwt-decode';
import { refreshToken as refreshTokenApiCall } from '../api-calls/auth';

const checkAndRefreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  let accessToken = getAccessToken();

  if (!accessToken) {
    return null;
  }

  const decodedToken = jwtDecode(accessToken);

  if (!decodedToken || !decodedToken.exp) {
    return null;
  }

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp > currentTime + 60) {
    return accessToken;
  }

  if (!refreshToken) {
    return null;
  }

  const tokens = await refreshTokenApiCall();

  if (!tokens) {
    return null;
  }

  setAccessToken(tokens.data.accessToken);
  setAccessToken(tokens.data.refreshToken);
  accessToken = tokens.data.accessToken;
  return accessToken;
};

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}`;

axios.interceptors.request.use(async (config) => {
  let accessToken = getAccessToken();

  if (accessToken) {
    accessToken = await checkAndRefreshAccessToken();
    if (!accessToken) {
      logout();
    }
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

export default axios;
