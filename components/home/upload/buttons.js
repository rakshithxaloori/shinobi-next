import styles from "styles/components/upload/Buttons.module.css";

const Buttons = ({ disable, handleCancel, handleUpload }) => (
  <div className={styles.container}>
    <button className={styles.button} onClick={handleUpload} disabled={disable}>
      Upload
    </button>
    <button className={styles.button} onClick={handleCancel} disabled={disable}>
      Cancel
    </button>
  </div>
);

export default Buttons;
