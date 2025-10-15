const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const ENDPOINTS = {
  REGISTER: `${BASE_URL}/api/auth/local/register`,
  LOGIN: `${BASE_URL}/api/auth/login`,
    CHECK_EMAIL: `${BASE_URL}/api/auth/check-email`, 
};
