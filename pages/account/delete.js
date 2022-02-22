import Head from "next/head";

import MailTo from "components/mailto";

import styles from "styles/legal/Legal.module.css";

const Delete = () => (
  <div className={styles.container}>
    <Head>
      <title>Delete Account | Shinobi</title>
    </Head>
    <div className={styles.textBody}>
      <strong>Delete Account</strong>
      <p>
        To delete an account, send an email to <MailTo />
      </p>
      <p>
        If you are not sure, then please don&apos;t break up with us{" "}
        <span role="img" aria-label="pleading">
          🥺
        </span>
      </p>
      <p>
        Note that deleting an account is permanent and irreversible. (Just like
        breaking up. SAY WHAT{" "}
        <span role="img" aria-label="pleading">
          ❤
        </span>
        )
      </p>
    </div>
  </div>
);

export default Delete;
