import Image from "next/image";

import styles from "styles/Home.module.css";

import PlayStore from "components/playstore";

const SCREENSHOT_HEIGHT = 600;

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <span className={styles.title}>welcome to shinobi!</span>
        <div className={styles.subtitles}>
          <p className={styles.subtitle}>One place to share gaming clips</p>
          <p className={styles.subtitle}>60 seconds clip upto 500 MB!</p>
        </div>
        <PlayStore />
      </div>
      <Image
        src="/screenshots/ss1.png"
        height={SCREENSHOT_HEIGHT}
        width={(SCREENSHOT_HEIGHT * 1480) / 2740}
        alt="Shinobi SS"
      />
    </div>
  );
}
