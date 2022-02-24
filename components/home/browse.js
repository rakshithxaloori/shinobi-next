import { useDropzone } from "react-dropzone";

import styles from "styles/home/Browse.module.css";

const Browse = ({ setVideoFile }) => {
  const onDrop = (files) => {
    if (files.length > 0) setVideoFile(files[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/*",
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className={styles.browse}>
      <div {...getRootProps()} className={styles.dragDrop}>
        <input {...getInputProps()} type="file" className={styles.videoInput} />
        {isDragActive ? (
          <span>Drop the clip here ...</span>
        ) : (
          <span>Drag and drop a clip here, or click to browse</span>
        )}
      </div>
    </div>
  );
};

export default Browse;
