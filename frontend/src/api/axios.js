import axios from "axios";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        message.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        break;

      case 403:
        message.error("You are not authorized.");
        break;

      case 404:
        message.error("API not found.");
        break;

      case 500:
        message.error("Server error. Please try again later.");
        break;

      default:
        message.error(
          error.response?.data?.message || "Something went wrong"
        );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;