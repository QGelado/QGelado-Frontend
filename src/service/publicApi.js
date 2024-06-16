import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
});

export default publicApi;