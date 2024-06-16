import axios from 'axios';
import { getToken } from '../config/auth';

const privateApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
});

privateApi.interceptors.request.use(async (config) => {
  const conf = config;
  const token = getToken();
  if (token) {
    conf.headers.authorization = `Bearer ${token}`;
  }

  return conf;
});

export default privateApi;