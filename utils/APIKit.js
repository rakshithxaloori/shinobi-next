import axios from "axios";

export const createAPIKit = async (token_key = null) => {
  let API_ENDPOINT = undefined;
  if (process.env.NEXT_PUBLIC_CI_CD_STAGE === "production")
    API_ENDPOINT = `https://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}`;
  else API_ENDPOINT = `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}`;

  let headers = { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY };
  if (token_key) {
    headers["Authorization"] = `Token ${token_key}`;
  }
  console.log(headers);
  const APIKit = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: headers,
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
