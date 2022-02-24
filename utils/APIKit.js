import axios from "axios";

export let API_ENDPOINT = undefined;
if (process.env.CI_CD_STAGE === "production")
  API_ENDPOINT = `https://${process.env.BASE_API_ENDPOINT}`;
else API_ENDPOINT = `http://${process.env.BASE_API_ENDPOINT}`;

export const createAPIKit = async () => {
  const APIKit = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: { "X-Api-Key": process.env.API_KEY },
  });
  return APIKit;
};
