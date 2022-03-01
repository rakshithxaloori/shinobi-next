import { useState } from "react";

import styles from "styles/Home.module.css";

import Browse from "components/home/browse";
import Upload from "components/home/upload";
import getIsMobile from "hooks/dimensions";

const Home = () => {
  const isMobile = getIsMobile();
  const [videoFile, setVideoFile] = useState();

  return (
    <div className={styles.container}>
      {videoFile ? (
        <Upload videoFile={videoFile} setVideoFile={setVideoFile} />
      ) : (
        <div className={isMobile ? styles.browseMobile : styles.browseWeb}>
          <div>
            <h1>Share gaming clips</h1>
          </div>
          <Browse setVideoFile={setVideoFile} />
        </div>
      )}
    </div>
  );
};

export default Home;
