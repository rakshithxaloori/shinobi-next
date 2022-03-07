import { useState } from "react";
import { useDropzone } from "react-dropzone";

import styles from "styles/home/Browse.module.css";

import { VIDEO_MAX_SIZE, VIDEO_MIME_TYPES } from "utils/clip";

const Browse = ({ setVideoFile, count, networkE }) => {
  const [error, setError] = useState(networkE);
  const onDrop = (files) => {
    if (files.length > 0) {
      const videoFile = files[0];
      if (videoFile.size > VIDEO_MAX_SIZE)
        setError(
          `Video has to be smaller than ${VIDEO_MAX_SIZE / (1000 * 1000)} MB`
        );
      else if (VIDEO_MIME_TYPES.includes(videoFile.type) === false) {
        setError("Select an avi, ogg, mp4, mov or webm video");
      } else {
        setError("");
        setVideoFile(files[0]);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: VIDEO_MIME_TYPES.join(","),
    maxFiles: 1,
    multiple: false,
    onFileDialogOpen: () => setError(""),
  });

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h1 className={styles.title}>Share gaming clips</h1>
        <h3 className={styles.subtitle}>Create a sharable gaming clip</h3>
        {
          <span className={styles.count}>
            {count
              ? `Over ${count} clips shared by gamers`
              : `HD gaming clips for free`}
          </span>
        }
      </div>
      <div className={styles.dropzone}>
        <span className={styles.error}>{error}</span>
        <div {...getRootProps()} className={styles.dragDrop}>
          <input
            {...getInputProps()}
            type="file"
            className={styles.videoInput}
          />
          {isDragActive ? (
            <span>Drop the clip here ...</span>
          ) : (
            <span>Drag and drop a clip here, or click to browse</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
