import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
