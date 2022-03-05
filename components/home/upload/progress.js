import styles from "styles/components/upload/Progress.module.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.container}>
      <progress className={styles.progress} value={progress} max="100">
        {progress}%
      </progress>
    </div>
  );
};

export default ProgressBar;
