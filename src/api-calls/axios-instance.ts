import axios from 'axios';
import { getAccessToken } from '../utils/auth';

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}`;

axios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  console.log({ accessToken });
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export default axios;
