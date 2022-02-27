import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { signIn, getSession } from "next-auth/react";

import styles from "styles/SignUp.module.css";

// Signup to save the user in backend
// Then redirect to sign in
const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);

  const signUp = () => {
    setDisable(true);
    // Validate username
    if (!_validateUsername(username, setError)) {
      setDisable(true);
      return;
    }
    // Add cookie
    Cookies.set("username", username, { expires: 1 });
    // Call signin
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {error && <span className={styles.error}>{error}</span>}
        <input
          placeholder="Username"
          className={styles.inputField}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value.trim());
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
        <button className={styles.button} onClick={signUp} disabled={disable}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const _validateUsername = (username, setError) => {
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

  return true;
};
