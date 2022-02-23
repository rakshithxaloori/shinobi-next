import Link from "next/link";
import {
  IoLogoDiscord,
  IoLogoReddit,
  IoMailOpenOutline,
} from "react-icons/io5";

import styles from "styles/components/layout/Footer.module.css";

import PlayStore from "components/playstore";
import getIsMobile from "hooks/dimensions";

const Footer = () => {
  const isMobile = getIsMobile();

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <div className={isMobile ? styles.gridColumn : styles.gridRow}>
          <div className={styles.column}>
            <Link href="/legal/privacy-policy">
              <a
                className={styles.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Privacy Policy
              </a>
            </Link>
            <Link href="/legal/terms">
              <a
                className={styles.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Terms & Conditions
              </a>
            </Link>
            <Link href="/account/delete">
              <a
                className={styles.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Delete Account
              </a>
            </Link>
          </div>
          <div className={styles.column}>
            <Link href="https://www.reddit.com/r/ShinobiApp/">
              <a
                className={styles.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <IoLogoReddit />
                <span className={styles.socialText}>Reddit</span>
              </a>
            </Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK}>
              <a
                className={styles.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <IoLogoDiscord />
                <span className={styles.socialText}>Discord</span>
              </a>
            </Link>
            <Link href="mailto:hello@shinobi.cc">
              <a
                className={styles.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <IoMailOpenOutline />
                <span className={styles.socialText}>Write to us ❤️</span>
              </a>
            </Link>
          </div>
          <div className={styles.column}>
            <PlayStore />
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
