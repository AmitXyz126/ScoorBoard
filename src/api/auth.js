import axios from "axios";
import { ENDPOINTS } from "./endpoints";

// Login User
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, loginData);
    return response.data; // response me token & user info aana chahiye
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

// Baaki APIs remain same
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Check Email Exists
export const checkEmailExists = async (email) => {
  try {
    const response = await axios.post(ENDPOINTS.CHECK_EMAIL, { email });
    return response.data;
  } catch (error) {
    console.error("Check Email Error:", error.response?.data || error.message);
    return { exists: false };
  }
};

// Create Team
export const createTeam = async (teamData) => {
  try {
    const response = await axios.post(ENDPOINTS.CREATE_TEAM, teamData);
    return response.data;
  } catch (error) {
    console.error("Create Team Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to create team" };
  }
};

// Get Teams List
export const getTeams = async () => {
  try {
    const response = await axios.get(ENDPOINTS.GET_TEAMS);
    return response.data;
  } catch (error) {
    console.error("Get Teams Error:", error.response?.data || error.message);
    return [];
  }
};

// Upload Logo
export const uploadLogo = async (file, userToken) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name || "logo.png",
      type: file.type || "image/png",
    });

    const url = teamId
      ? `${ENDPOINTS.UPLOAD_LOGO}?id=${teamId}`
      : ENDPOINTS.UPLOAD_LOGO;

    const response = await axios.post(url, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload Logo Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Logo upload failed" };
  }
};
