import axios from 'axios';

const proxyUrl = 'http://localhost:5000';

export const igdbClient = axios.create({
  baseURL: proxyUrl,
});
