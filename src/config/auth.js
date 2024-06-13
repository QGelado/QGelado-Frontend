import { jwtKey } from './environment';

export const getToken = () => localStorage.getItem(jwtKey);

export const setToken = (token) => localStorage.setItem(jwtKey, token);

export const getUser = () => ({});