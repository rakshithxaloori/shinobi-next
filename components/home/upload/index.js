import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import styles from "styles/home/Upload.module.css";

import Title from "components/home/upload/title";
import SelectGame from "components/home/upload/select_game";
import ProgressBar from "components/home/upload/progress";
import Buttons from "components/home/upload/buttons";
import Recaptcha from "components/home/upload/recaptcha";

import getIsMobile from "hooks/dimensions";
import Share from "components/clip/share";
import axios from "axios";
import {
  VIDEO_MIME_TYPES,
  VIDEO_MAX_SIZE,
  VIDEO_MIN_DURATION,
  VIDEO_MAX_DURATION,
  POST_TITLE_LENGTH,
} from "utils/clip";

// When ffmpeg packages are updated,
// update files in public dir
const ffmpeg = createFFmpeg({
  // log: true,
  corePath: "./ffmpeg-core/dist/ffmpeg-core.js",
});

const THUMBNAIL_MIME_TYPE = "image/png";
const THUMBNAIL_EXTENSION = "png";

const Upload = ({ videoFile, setVideoFile }) => {
  const videoRef = useRef();
  const videoUrl = URL.createObjectURL(videoFile);

  const session = useSession();
  const isMobile = getIsMobile();
  const [ready, setReady] = useState();
  const [thumbnailFile, setThumbnailFile] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();

  const [title, setTitle] = useState("");
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const recaptchaRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [postId, setPostId] = useState();

  useEffect(() => {
    loadFFmpeg();
    const unloadListener = (ev) => {
      if (isUploading) {
        ev.preventDefault();
        ev.returnValue = "Uploading a clip. Are you sure you want to close?";
      }
    };
    window.addEventListener("beforeunload", unloadListener);
    return () => window.removeEventListener("beforeunload", unloadListener);
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

  const _verify = () => {
    setError("");
    if (VIDEO_MIME_TYPES.includes(videoFile.type) === false) {
      setError("Select an ogg, mp4, mov or webm video");
      return false;
    }

    if (videoFile.size > VIDEO_MAX_SIZE) {
      setError("Select a file with size less than 500 MB");
      return false;
    }

    const clipDuration = videoRef.current.duration;
    if (isNaN(clipDuration)) {
      setWarning(
        `The clip won't appear in feed, if it's is less than ${VIDEO_MIN_DURATION} or more than ${VIDEO_MAX_DURATION} seconds`
      );
    } else if (
      clipDuration < VIDEO_MIN_DURATION ||
      clipDuration >= VIDEO_MAX_DURATION + 1
    ) {
      setError("Clip must be b/w 5 and 60 seconds long");
      return false;
    }

    // Check title length
    if (title === "") {
      setError("Add a title");
      return false;
    }

    if (title.length > POST_TITLE_LENGTH) {
      setError("Title has to be less than 80 characters");
      return false;
    }

    if (game === null) {
      setError("Choose a game");
      return false;
    }

    return true;
  };

  const handleCancel = async () => {
    await recaptchaRef.current.reset();
    setVideoFile(null);
  };

  const handleUpload = async () => {
    // Verify stuff
    if (!_verify()) return;

    const videoSplit = videoFile.name.split(".");
    const thumbnailSplit = thumbnailFile.name.split(".");
    const clipDuration = videoRef.current.duration;

    setIsUploading(true);
    const token = await recaptchaRef.current.executeAsync();
    const post_data = {
      recaptcha_token: token,
      clip_size: videoFile.size,
      clip_type: videoSplit[videoSplit.length - 1],
      thumbnail_size: thumbnailFile.size,
      thumbnail_type: thumbnailSplit[thumbnailSplit.length - 1],
      game_code: game.id,
      title: title,
      clip_height: videoRef.current.videoHeight || 0,
      clip_width: videoRef.current.videoWidth || 0,
      duration: clipDuration || 0,
    };

    try {
      const response = await axios.post("/api/clips/presigned/web/", post_data);
      const { url, thumbnail_url, post_id } = response.data?.payload;
      setPostId(post_id);

      const tb_res = await _uploadFileToS3(thumbnailFile, thumbnail_url);
      if (!tb_res) {
        // Some error
      }
      const clip_res = await _uploadFileToS3(videoFile, url, (event) =>
        setProgress(Math.round((100 * event.loaded) / event.total))
      );
      if (clip_res) {
        // Send request as uploaded
        const upload_res = await axios.post("/api/clips/success/", {
          file_key: url.fields.key,
        });
        if (upload_res.status === 200) {
          // TODO upload successful
        }
      } else {
        // Some error
        setIsUploading(false);
      }
    } catch (e) {
      setIsUploading(false);
      // TODO set error
    }
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

    setThumbnailFile(thumbnailItem);
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
            {error ? (
              <span className={styles.error}>{error}</span>
            ) : warning ? (
              <span className={styles.warning}>{warning}</span>
            ) : null}

            <Title title={title} setTitle={setTitle} disable={isUploading} />

            <SelectGame
              game={game}
              setGame={setGame}
              disable={isUploading}
              setError={setError}
            />

            {isUploading ? (
              progress < 100 ? (
                <ProgressBar progress={progress} />
              ) : postId ? (
                <Share
                  post={{
                    id: postId,
                    title,
                    game: { name: game.name, logo: game.logo },
                    posted_by: {
                      username: session.username,
                      picture: session.picture,
                    },
                  }}
                />
              ) : (
                <span>Creating a shareable link...</span>
              )
            ) : (
              <Buttons
                disable={isUploading}
                handleCancel={handleCancel}
                handleUpload={handleUpload}
              />
            )}
          </div>
          <video ref={videoRef} hidden>
            <source src={videoUrl} />
          </video>
          <Recaptcha recaptchaRef={recaptchaRef} />
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

const _uploadFileToS3 = async (fileObj, s3_url, uploadProgress = () => {}) => {
  if (fileObj && s3_url) {
    const formData = new FormData();
    // append the fields in url in formData
    Object.keys(s3_url.fields).forEach((key) => {
      formData.append(key, s3_url.fields[key]);
    });

    // append the file
    formData.append("file", fileObj);

    try {
      const response = await axios.post(s3_url.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: uploadProgress,
      });
      return response;
    } catch (e) {}
  }
};

export default Upload;
