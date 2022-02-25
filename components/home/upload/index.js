import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import styles from "styles/home/Upload.module.css";

import Title from "components/home/upload/title";
import SelectGame from "components/home/upload/select_game";
import ProgressBar from "components/home/upload/progress";
import Buttons from "components/home/upload/buttons";
import Recaptcha from "components/home/upload/recaptcha";

import getIsMobile from "hooks/dimensions";
import Share from "components/clip/share";

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

  const [title, setTitle] = useState("");
  const [game, setGame] = useState(null);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");

  const recaptchaRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [post, setPost] = useState();

  useEffect(() => {
    loadFFmpeg();
  }, []);

  useEffect(() => {
    if (ready && videoFile) createThumbnail();
  }, [ready]);

  const loadFFmpeg = async () => {
    if (!ffmpeg.isLoaded()) {
      console.log("Loading ffmpeg");
      await ffmpeg.load();
    }
    setReady(true);
  };

  const handleCancel = async () => {
    await recaptchaRef.current.reset();
    setVideoFile(null);
  };

  const handleUpload = async () => {};

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
          <div className={styles.details}>
            <Title title={title} setTitle={setTitle} disable={disable} />

            <SelectGame
              game={game}
              setGame={setGame}
              disable={disable}
              setError={setError}
            />

            {isUploading ? (
              progress < 100 ? (
                <ProgressBar progress={progress} />
              ) : post ? (
                <Share post={post} />
              ) : (
                <span>Creating a shareable link...</span>
              )
            ) : (
              <Buttons
                disable={disable}
                handleCancel={handleCancel}
                handleUpload={handleUpload}
              />
            )}
          </div>
          <Recaptcha recaptchaRef={recaptchaRef} />
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Upload;
