import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

import styles from "styles/components/upload/Title.module.css";

import { POST_TITLE_LENGTH } from "utils/lengths";

const Title = ({ title, setTitle, disable }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <textarea
          className={styles.inputField}
          placeholder="A cool title for the clip!"
          value={title}
          onChange={(e) => setTitle(e.target.value.replace(/\s+/g, " "))}
          cols={30}
          rows={3}
          required
          disabled={disable}
        />
      </div>
      <span
        className={`${styles.count} ${
          title.length > POST_TITLE_LENGTH && styles.error
        }`}
      >
        {title.length}/80
      </span>
    </div>
  );
};

export default Title;
