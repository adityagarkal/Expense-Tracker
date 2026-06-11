import axios from "axios"

const API = axios.create({
    baseURL: "https://expense-tracker-d6ku.onrender.com",
});

// ADD TOKEN AUTOMATICALLY

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {

    req.headers.Authorization = `Bearer ${token}`;

  }

  return req;

});

export default API;