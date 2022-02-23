import axios from "axios";
import { getSession } from "next-auth/react";

export let API_ENDPOINT = undefined;
if (process.env.CI_CD_STAGE === "production")
  API_ENDPOINT = `https://${process.env.BASE_API_ENDPOINT}`;
else API_ENDPOINT = `http://${process.env.BASE_API_ENDPOINT}`;

export const createAPIKit = async () => {
  let APIKit = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: { "X-Api-Key": process.env.API_KEY },
  });

  const session = await getSession();
  let token = session?.token_key;
  if (token) {
    APIKit.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
  return APIKit;
};
