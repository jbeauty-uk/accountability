import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PATH,
});

const setToken = (token) => {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { http, setToken };
