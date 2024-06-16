import { jwtKey } from './environment';

export const getToken = () => localStorage.getItem(jwtKey);

export const setToken = (token) => localStorage.setItem(jwtKey, token);
export const setUserId = (id) => localStorage.setItem("idUser", id);

export const getUser = () => ({});