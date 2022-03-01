import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "styles/components/layout/Header.module.css";
import AuthModal from "components/auth/modal";

const PICTURE_SIZE = 25;
const SIGNIN_HREF = "/auth/signin";
const SIGNUP_HREF = "/auth/signup";

const Header = () => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const isAuthPage =
    router.pathname === "/auth/signin" || router.pathname === "/auth/signup";
  console.log(isAuthPage);

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
              <Link href={SIGNIN_HREF}>
                <a
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isAuthPage) {
                      router.push(SIGNIN_HREF);
                    } else {
                      signIn("google");
                    }
                  }}
                >
                  Sign In
                </a>
              </Link>
            </li>
            <li>
              <Link href={SIGNUP_HREF}>
                <a
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isAuthPage) {
                      router.push(SIGNUP_HREF);
                    } else {
                      setIsOpen(true);
                    }
                  }}
                >
                  Sign Up
                </a>
              </Link>
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
