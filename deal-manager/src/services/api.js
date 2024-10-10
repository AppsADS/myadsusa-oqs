import axios from 'axios';

const API_URL = 'https://myadsusa-oqs.appspot.com/api'; // Backend API URL

const api = axios.create({
    baseURL: API_URL,
});

export default api;
