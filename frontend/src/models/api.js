import axios from 'axios';

//const BASE_URL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3333' : '';
const BASE_URL = '';

const api = axios.create({
    baseURL: BASE_URL,
});

const auth = (user) => ({
    headers: { Authorization: `${user.username} ${user.token}` }
});

export {api, auth };