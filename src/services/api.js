import axios from "axios";

const api = axios.create({
  baseURL: "https://oministack-backend.herokuapp.com"
});

export default api;
