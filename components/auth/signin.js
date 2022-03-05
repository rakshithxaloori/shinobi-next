import { signIn } from "next-auth/react";

import globalStyles from "styles/Globals.module.css";

const SignIn = ({ disable, setDisable }) => {
  const handleSignIn = async () => {
    signIn("google");
    setDisable(false);
  };
  return (
    <button
      className={globalStyles.button}
      onClick={handleSignIn}
      disabled={disable}
    >
      Sign In
    </button>
  );
};

export default SignIn;
