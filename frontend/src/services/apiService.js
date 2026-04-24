import axiosInstance from "@/api/axios";

export const getRequest = async (url) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const postRequest = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const putRequest = async (url, data) => {
  try {
    const res = await axiosInstance.put(url, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteRequest = async (url) => {
  try {
    const res = await axiosInstance.delete(url);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};