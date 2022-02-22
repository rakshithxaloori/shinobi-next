import Link from "next/link";
import { IoLogoDiscord, IoLogoReddit } from "react-icons/io5";

import styles from "styles/components/layout/Footer.module.css";

import PlayStore from "components/playstore";
import useWindowDimensions from "hooks/dimensions";

const Footer = () => {
  const windowDimensions = useWindowDimensions();

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <div
          className={
            windowDimensions.width <= 768 ? styles.gridColumn : styles.gridRow
          }
        >
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
