const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const ENDPOINTS = {
  REGISTER: `${BASE_URL}/api/auth/local/register`,
  LOGIN: `${BASE_URL}/api/auth/login`,
  CHECK_EMAIL: `${BASE_URL}/api/auth/check-email`,
  CREATE_TEAM: `${BASE_URL}/api/teams`,
  GET_TEAMS: `${BASE_URL}/api/teams`,
  UPLOAD_LOGO: `${BASE_URL}/api/upload`,
  DELETE_TEAM: (id) => `${BASE_URL}/api/teams/${id}`,
  UPDATE_TEAM: (id) => `${BASE_URL}/api/teams/${id}`,
  //  Create Match
  CREATE_MATCH: `${BASE_URL}/api/matches/create-and-start`,
  UPDATE_SCORE: (matchId) => `${BASE_URL}/api/matches/${matchId}/score`,
  END_MATCH: (matchId) => `${BASE_URL}/api/matches/${matchId}/end`,
  //   //  Get Match by Code
  // GET_MATCH_BY_CODE: (code) => `${BASE_URL}/api/matches/code/${code}`,

};
