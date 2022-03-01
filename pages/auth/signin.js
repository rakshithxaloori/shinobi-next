import { useState } from "react";
import { useRouter } from "next/router";

import styles from "styles/auth/Signin.module.css";

import Error from "components/error";
import SignIn from "components/auth/signin";

const SignInPage = () => {
  const { error } = useRouter().query;
  const [disable, setDisable] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Share gaming clips!</h2>
          <span className={styles.subtitle}>
            Sign in to start sharing gaming clips
          </span>
        </div>
        {error && <Error error={error} />}
        <SignIn disable={disable} setDisable={setDisable} />
      </div>
    </div>
  );
};

export default SignInPage;

export async function getServerSideProps(context) {
  const { error } = context?.query;

  if (error) {
    switch (error) {
      case "Callback":
        return {
          redirect: {
            destination: "/auth/signup",
            permanent: false,
          },
        };
      default:
        return { props: { error: error } };
    }
  } else return { props: {} };
}
