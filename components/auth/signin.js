import { signIn } from "next-auth/react";

import authStyles from "styles/components/auth/Auth.module.css";

const SignIn = ({ disable, setDisable }) => {
  const handleSignIn = async () => {
    signIn("google");
    setDisable(false);
  };
  return (
    <button
      className={authStyles.button}
      onClick={handleSignIn}
      disabled={disable}
    >
      Sign In
    </button>
  );
};

export default SignIn;
