import axios from "axios";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: "https://firstbackend-1c5d.onrender.com/api",
  withCredentials: true, // Include cookies with requests
});

export default api;
