import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Backend API URL

const api = axios.create({
    baseURL: API_URL,
});

export default api;
