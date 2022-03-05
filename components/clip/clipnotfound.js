import styles from "styles/components/ClipNotFound.module.css";

const ClipNotFound = ({ error = null }) => (
  <span className={styles.container}>
    {typeof error === "string" ? error : "Clip Not Found"}
  </span>
);

export default ClipNotFound;
