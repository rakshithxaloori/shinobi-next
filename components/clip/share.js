import { useState } from "react";
import { HiOutlineClipboardCheck, HiOutlineClipboard } from "react-icons/hi";

import styles from "styles/components/Share.module.css";

import { create_clip_url } from "../../utils/urls";
import Reddit from "components/share/reddit";
import Facebook from "components/share/facebook";
import Twitter from "components/share/twitter";
import getIsMobile from "hooks/dimensions";

const SOCIALS_ICON_SIZE = 30;
const CLIPBOARD_ICON_SIZE = 26;

const Share = ({ post }) => {
  const isMobile = getIsMobile();
  const [copied, setCopied] = useState(false);
  const { id, title, game, posted_by } = post;

  const shinobi_url = create_clip_url(id);
  const facebook_text = `A ${game.name} clip by ${posted_by.username} | Shinobi`;
  const reddit_title = title;
  const reddit_text = `${posted_by.username} | Shinobi\n${shinobi_url}`;
  const twitter_text = `${title}\nA ${game.name} clip by ${posted_by.username} | Shinobi\n${shinobi_url}`;

  const copyTextToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  const clickCopy = async () => {
    await copyTextToClipboard(shinobi_url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div
      className={`${styles.container} ${isMobile ? styles.mobile : styles.web}`}
    >
      <section className={styles.link}>
        <span>
          {isMobile ? shinobi_url.replace("https://", "") : shinobi_url}
        </span>
        <span className={styles.copy} onClick={clickCopy}>
          {copied ? (
            <HiOutlineClipboardCheck size={CLIPBOARD_ICON_SIZE} />
          ) : (
            <HiOutlineClipboard size={CLIPBOARD_ICON_SIZE} />
          )}
        </span>
      </section>
      <section className={styles.socials}>
        <Facebook
          shinobi_url={shinobi_url}
          text={facebook_text}
          className={styles.social}
          iconSize={SOCIALS_ICON_SIZE}
        />
        <Reddit
          title={reddit_title}
          text={reddit_text}
          className={styles.social}
          iconSize={SOCIALS_ICON_SIZE}
        />
        <Twitter
          text={twitter_text}
          className={styles.social}
          iconSize={SOCIALS_ICON_SIZE}
        />
      </section>
    </div>
  );
};

export default Share;
