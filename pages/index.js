import { useState } from "react";

import styles from "styles/Home.module.css";

import Browse from "components/home/browse";
import Upload from "components/home/upload";
import { createAPIKit, networkError } from "utils/APIKit";

const Home = ({ count, error }) => {
  const [videoFile, setVideoFile] = useState();

  return (
    <div className={styles.container}>
      {videoFile ? (
        <Upload videoFile={videoFile} setVideoFile={setVideoFile} />
      ) : (
        <Browse setVideoFile={setVideoFile} count={count} networkE={error} />
      )}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const APIKit = await createAPIKit();
    const response = await APIKit.get("/feed/count/");
    const { count } = response.data?.payload;
    return { props: { count: count, error: "" } };
  } catch (e) {
    return { props: { count: null, error: networkError(e) } };
  }
}
