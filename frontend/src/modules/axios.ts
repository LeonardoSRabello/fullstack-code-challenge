import axios from "axios";

export const getApiClient = () => {
  return axios.create({
    headers: {
      "Content-Type": "application/json"
    },
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api"
  });
};
