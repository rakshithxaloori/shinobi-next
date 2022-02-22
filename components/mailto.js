import Link from "next/link";

import styles from "styles/components/MailTo.module.css";

const MailTo = () => (
  <Link href="mailto:hello@shinobi.cc">
    <a className={styles.mailLink}>hello@shinobi.cc</a>
  </Link>
);

export default MailTo;
