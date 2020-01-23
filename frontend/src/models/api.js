import axios from 'axios';

//const BASE_URL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3333' : '';
const BASE_URL = '';

const axios_api = axios.create({
    baseURL: BASE_URL,
});

export default axios_api;