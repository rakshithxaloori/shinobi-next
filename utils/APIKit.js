import axios from "axios";

export const createAPIKit = async (token_key = null) => {
  let API_ENDPOINT = undefined;
  if (process.env.CI_CD_STAGE === "production")
    API_ENDPOINT = `https://${process.env.BASE_API_ENDPOINT}`;
  else API_ENDPOINT = `http://${process.env.BASE_API_ENDPOINT}`;

  let headers = { "X-Api-Key": process.env.API_KEY };
  if (token_key) {
    headers["Authorization"] = `Token ${token_key}`;
  }
  const APIKit = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {},
  });
  return APIKit;
};

export const networkError = (error) => {
  if (error.response) {
    // Request made and server responded
    if (error.response.status >= 500) return "Oops, server error";
    else return error.response.data.detail;
  } else if (error.request) {
    // The request was made but no response was received
    return "You're offline";
  } else {
    // Something happened in setting up the request that triggered an Error
    return "Huh, something went wrong";
  }
};
