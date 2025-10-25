import axios from "axios";
import { ENDPOINTS } from "./endpoints";

// Login User
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, loginData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

//  Register
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

// Get Teams List
export const getTeamsDetails = async (teamId, userToken) => {
  try {
    const response = await axios.get(ENDPOINTS.UPDATE_TEAM(teamId), {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Upload Logo Error:", err.response?.data || err.message);
  }
};

// Upload Logo
export const uploadLogo = async (file, userToken) => {
  console.log("Selected file:", file);

  try {
    const formData = new FormData();
    formData.append("files", file);
    const response = await axios.post(ENDPOINTS.UPLOAD_LOGO, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload Logo Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Logo upload failed" };
  }
};

// DELETE_TEAM
export const deleteTeam = async (id) => {
  try {
    const response = await axios.delete(ENDPOINTS.DELETE_TEAM(id));
    console.log("Team deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete Team Error:", error.response?.data || error.message);
    throw error;
  }
};

// updateTeam

export const updateTeam = async (teamId, data, token) => {
  try {
    const response = await axios.put(ENDPOINTS.UPDATE_TEAM(teamId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; 
  } catch (error) {
    console.error(
      "Update Team API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
