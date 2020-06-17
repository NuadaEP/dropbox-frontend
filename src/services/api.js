import axios from "axios";

const api = axios.create({
  baseURL: "https://dropboxapi.herokuapp.com/"
});

export default api;
