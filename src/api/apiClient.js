import axios from "axios";

const apiClient = axios.create({
  // baseURL:"http://localhost:3000/api/v1"
  baseURL: "http://192.168.1.68:5000/api/v1",
});

export default apiClient;
