import axios from 'axios';

// This creates a new 'instance' of axios with a pre-configured base URL.
const api = axios.create({
  // process.env.REACT_APP_API_URL will be read from your .env file locally,
  // and from the Vercel environment variables when deployed.
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
