import Image from "next/image";
import Link from "next/link";
import { IoCloudUploadOutline } from "react-icons/io5";

import styles from "styles/components/layout/Header.module.css";

const Header = () => (
  <div className={styles.header}>
    <Link href="/">
      <a className={styles.link} title="Shinobi">
        <Image src="/logo512.png" width={40} height={40} alt="Shinobi" />
        <span className={styles.logoName}>Shinobi</span>
      </a>
    </Link>
    <Link href="https://upload.shinobi.cc">
      <a
        className={styles.upload}
        rel="noopener noreferrer"
        target="_blank"
        title="Create a shareable clip"
      >
        <IoCloudUploadOutline />
      </a>
    </Link>
  </div>
);

export default Header;
