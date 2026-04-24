import { getRequest, postRequest } from "@/services/apiService";

export const loginUser = (data) => {
  return postRequest("/users/login", data);
};

export const registerUser = (data) => {
  return postRequest("/users/register", data);
};

export const getProfile = () => {
  return getRequest("/users/profile");
};