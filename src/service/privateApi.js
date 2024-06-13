import axios from 'axios';
import { getToken } from '../config/auth';

const privateApi = axios.create({
  baseURL: 'http://localhost:3000',
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