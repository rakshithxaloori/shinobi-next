import { useState } from "react";

import styles from "styles/Home.module.css";

import Browse from "components/home/browse";
import Upload from "components/home/upload";

const Home = () => {
  const [videoFile, setVideoFile] = useState();

  return (
    <div className={styles.container}>
      {videoFile ? (
        <Upload videoFile={videoFile} setVideoFile={setVideoFile} />
      ) : (
        <Browse setVideoFile={setVideoFile} />
      )}
    </div>
  );
};

export default Home;
