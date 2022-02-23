import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoCloudUploadOutline } from "react-icons/io5";

import styles from "styles/components/layout/Header.module.css";

const PICTURE_SIZE = 25;

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <nav className={styles.header}>
      <Link href="/">
        <a className={styles.title} title="Shinobi">
          <Image src="/logo512.png" width={40} height={40} alt="Shinobi" />
          <span className={styles.logoName}>Shinobi</span>
        </a>
      </Link>
      <ul
        className={`${styles.mainNav} ${
          !session && status === "loading" ? styles.loading : styles.loaded
        }`}
      >
        <li>
          <Link href="https://upload.shinobi.cc">
            <a
              className={styles.link}
              rel="noopener noreferrer"
              target="_blank"
              title="Create a shareable clip"
            >
              <IoCloudUploadOutline />
            </a>
          </Link>
        </li>
        {status === "unauthenticated" && !session && (
          <li>
            <Link href="/api/auth/signin">
              <a
                className={styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google");
                }}
              >
                Sign In
              </a>
            </Link>
          </li>
        )}
        {status === "authenticated" && session && (
          <li>
            <Link href="/api/auth/signout">
              <a
                className={styles.link}
                onClick={async (e) => {
                  console.log("Signing out");
                  e.preventDefault();
                  signOut();
                }}
              >
                <Image
                  height={PICTURE_SIZE}
                  width={PICTURE_SIZE}
                  src={session?.picture}
                  alt={session?.username}
                  className={styles.picture}
                />
                <span style={{ marginLeft: 5 }}>Sign Out</span>
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
