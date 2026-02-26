import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const getSubscribers = () => API.get('/subscribers');
export const searchSubscribers = (query) => API.get(`/subscribers/search?query=${query}`);
export const addSubscriber = (data) => API.post('/subscribers', data);
export const deleteSubscriber = (id) => API.delete(`/subscribers/${id}`);
export const updateSubscriberStatus = (id, status) => 
  API.patch(`/subscribers/${id}/status?status=${status}`);