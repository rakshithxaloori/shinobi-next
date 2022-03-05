import { getSession } from "next-auth/react";

import styles from "styles/auth/Signup.module.css";
import SignUpComponent from "components/auth/signup";

const SignUpPage = () => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>Share gaming clips!</h2>
      <span className={styles.subtitle}>
        We ask you to create an account to avoid bots and spam.
      </span>
    </div>
    <SignUpComponent />
  </div>
);

export default SignUpPage;

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
