import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add request interceptor for logging
api.interceptors.request.use(request => {
  console.log('Starting Request:', request.method.toUpperCase(), request.url);
  console.log('Request data:', request.data);
  return request;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => {
    console.log('Response Success:', response.status, response.config.url);
    console.log('Response data:', response.data);
    return response;
  },
  error => {
    console.error('API Error Details:', {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    // Log the full error for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server responded with error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const galleryAPI = {
  getAll: () => api.get('/gallery'),
  create: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => {
    console.log('Calling delete API for ID:', id);
    return api.delete(`/gallery/${id}`);
  },
};

export const articlesAPI = {
  getAll: () => api.get('/articles'),
  create: (formData) => api.post('/articles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/articles/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => {
    console.log('Calling delete API for article ID:', id);
    return api.delete(`/articles/${id}`);
  },
};

export const contentAPI = {
  get: () => api.get('/content'),
  update: (data) => api.put('/content', data),
};

export default api;