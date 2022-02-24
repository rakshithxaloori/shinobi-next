import { useState, useEffect } from "react";
import Image from "next/image";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import styles from "styles/Home.module.css";
import getIsMobile from "hooks/dimensions";

// When ffmpeg packages are updated,
// update files in public dir
const ffmpeg = createFFmpeg({
  // log: true,
  corePath: "./ffmpeg-core/dist/ffmpeg-core.js",
});

const THUMBNAIL_MIME_TYPE = "image/png";
const THUMBNAIL_EXTENSION = "png";

const Upload = ({ videoFile, setVideoFile }) => {
  const isMobile = getIsMobile();
  const [ready, setReady] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();

  useEffect(() => {
    loadFFmpeg();
    return async () => {
      await ffmpeg.exit();
    };
  }, []);

  useEffect(() => {
    if (ready && videoFile) createThumbnail();
  }, [ready]);

  const loadFFmpeg = async () => {
    console.log("Loading ffmpeg");
    await ffmpeg.load();
    setReady(true);
  };

  const createThumbnail = async () => {
    ffmpeg.FS("writeFile", videoFile.name, await fetchFile(videoFile));
    const filename = `thumbnail.${THUMBNAIL_EXTENSION}`;
    // Get the thumbnail of first sec
    await ffmpeg.run(
      "-i",
      videoFile.name,
      "-ss",
      "00:00:00",
      "-frames:v",
      "1",
      "-q:v",
      "2",
      filename
    );

    const data = ffmpeg.FS("readFile", filename);
    // Create a file object
    const thumbnailItem = new File([data.buffer], filename, {
      type: THUMBNAIL_MIME_TYPE,
    });

    setThumbnail(thumbnailItem);
    setThumbnailUrl(URL.createObjectURL(thumbnailItem));
  };

  return (
    <div className={styles.container}>
      {ready && thumbnailUrl ? (
        <div
          className={`${styles.upload} ${
            isMobile ? styles.mobile : styles.web
          }`}
        >
          <div className={styles.thumbnail}>
            <Image
              src={thumbnailUrl}
              alt="Thumbnail"
              layout="fill"
              className={styles.image}
            />
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Upload;
