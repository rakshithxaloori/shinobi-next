import { getSession } from "next-auth/react";

import { createAPIKit } from "utils/APIKit";

const handler = async (req, res) => {
  const session = await getSession({ req });
  const APIKit = await createAPIKit();
  let token = session?.token_key;
  if (typeof token === "string") {
    APIKit.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
  const { params } = req.query;
  const url = "/" + params.join("/") + "/";

  try {
    let response = null;
    if (req.method === "GET") {
      response = await APIKit.get(url);
    } else if (req.method === "POST") {
      response = await APIKit.post(url, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle different errors
    if (error.response) {
      const { status, data } = error.response;
      // Request made and server responded
      if (status >= 500) res.status(status).json({ detail: "Server Error" });
      else res.status(status).json(data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(400).json({ detail: "Trouble connecting to the internet" });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(400).json({ detail: "Something went wrong" });
    }
  }
};

export default handler;
