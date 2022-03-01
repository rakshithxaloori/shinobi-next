import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "styles/components/layout/Header.module.css";
import AuthModal from "components/auth/modal";

const PICTURE_SIZE = 25;

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
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
        {status === "unauthenticated" && !session && (
          <>
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
            <li>
              <span className={styles.link} onClick={() => setIsOpen(true)}>
                Sign Up
              </span>
            </li>
          </>
        )}
        {status === "authenticated" && session && (
          <li>
            <Link href="/api/auth/signout">
              <a
                className={styles.link}
                onClick={(e) => {
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
      <AuthModal
        modalIsOpen={modalIsOpen}
        afterOpenModal={() => console.log("Modal Opened")}
        closeModal={() => setIsOpen(false)}
      />
    </nav>
  );
};

export default Header;
