import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const getClan = async (clanTag) => {
  const response = await api.get(`/clan/${clanTag}`);
  return response.data;
};

export const getCurrentCWL = async (clanTag) => {
  const response = await api.get(`/cwl/${clanTag}/current`);
  return response.data;
};

export const getAllCWL = async (clanTag) => {
  const response = await api.get(`/cwl/${clanTag}/all`);
  return response.data;
};

export const getCWLWar = async (warTag) => {
  if (!warTag || warTag === '#0') {
    throw new Error('Invalid war tag');
  }
  // Encode the warTag to handle the # symbol
  const encodedWarTag = encodeURIComponent(warTag);
  const response = await api.get(`/cwl/war/${encodedWarTag}`);
  return response.data;
};

export default api;
