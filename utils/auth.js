import { createAPIKit } from "./APIKit";

export const logOut = async (token_key = null) => {
  const APIKit = await createAPIKit();
  if (token_key) {
    APIKit.defaults.headers.common["Authorization"] = `Token ${token_key}`;
  }
  try {
    await APIKit.get("/auth/logout/");
  } catch (e) {}
};
