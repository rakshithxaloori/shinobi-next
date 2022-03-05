import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "react-modal";

import styles from "styles/components/auth/Modal.module.css";

import SignIn from "./signin";
import SignUp from "./signup";

const AuthModal = ({ modalIsOpen, afterOpenModal, closeModal }) => {
  const { status } = useSession();
  if (status === "authenticated") closeModal();

  const [disable, setDisable] = useState(false);

  return (
    <Modal
      className={styles.container}
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Hmm, hope you aren't a bot"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Share gaming clips!</h2>
        <span className={styles.subtitle}>
          We ask you to create an account to avoid bots and spam.
        </span>
      </div>

      <SignIn disable={disable} setDisable={setDisable} />

      <div className={styles.seperator} />

      <SignUp disable={disable} setDisable={setDisable} />
    </Modal>
  );
};

export default AuthModal;
