import axios from "axios";

const baseUrl = 'http://10.0.2.2:8000'

const apiService = axios.create({
    baseURL: 'http://192.168.1.4:8000/api', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

// apiService.defaults.baseURL = baseUrl;

export default apiService;