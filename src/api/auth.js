import axios from "axios";
import { ENDPOINTS } from "./endpoints";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, loginData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};



export const checkEmailExists = async (email) => {
  try {
    const response = await axios.post(ENDPOINTS.CHECK_EMAIL, { email });
    return response.data;
  } catch (error) {
    console.error("Check Email Error:", error.response?.data || error.message);
    return { exists: false }; 
  }
};

