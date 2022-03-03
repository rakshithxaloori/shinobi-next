import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import axios from "axios";

import globalStyles from "styles/Globals.module.css";
import styles from "styles/components/auth/Signup.module.css";

import { createAPIKit, networkError } from "utils/APIKit";

const SignUp = ({ disable, setDisable }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    setDisable(true);
    // Validate username
    const isValidUsername = await _validateUsername(username, setError);
    if (!isValidUsername) {
      setDisable(false);
      return;
    }
    // Add cookie
    Cookies.set("username", username, { expires: 1 });
    // Call signin
    signIn("google");
    setDisable(false);
  };

  return (
    <div className={styles.card}>
      {error && <span className={styles.error}>{error}</span>}
      <input
        placeholder="Username"
        className={styles.inputField}
        maxLength={30}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value.replace(/\s+/g, ""));
        }}
      />
      <div className={styles.statement}>
        <div>
          <span>By signing up, you agree to Shinobi&apos;s code - </span>
          <Link href="/legal/terms">
            <a
              className={styles.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Terms
            </a>
          </Link>
          <span> and </span>
          <Link href="/legal/privacy-policy">
            <a
              className={styles.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy Policy
            </a>
          </Link>
        </div>
      </div>
      <button
        className={globalStyles.button}
        onClick={signUp}
        disabled={disable}
      >
        Sign Up
      </button>
    </div>
  );
};

const _validateUsername = async (username, setError) => {
  if (!username) {
    setError("Username can't be empty");
    return false;
  }
  if (username.length < 4) {
    setError("Username must contain atleast 4 characters");
    return false;
  }
  if (username.length > 30) {
    setError("Username must not contain more than 30 characters");
    return false;
  }
  let usernameFormat = /^\w(.)*$/;
  if (!usernameFormat.test(username)) {
    setError("Username must start with an alphanumeric character");
    return false;
  }
  usernameFormat = /^\w+([\w\d_.-])*$/;
  if (!usernameFormat.test(username)) {
    setError("Username can contain alphanumeric _ . - characters only");
    return false;
  }

  try {
    const APIKit = await createAPIKit();
    const response = await APIKit.post("/auth/check_username/", {
      username,
    });
    if (response.status === 200) return true;
    else {
      setError("Username is taken");
      return false;
    }
  } catch (e) {
    setError(networkError(e));
    return false;
  }
};

export default SignUp;
