import Head from "next/head";
import Image from "next/image";

import VideoJS from "components/clip/video";
import ClipNotFound from "components/clip/clipnotfound";
import Share from "components/clip/share";

import styles from "styles/Clip.module.css";

import { createAPIKit, networkError } from "utils/APIKit";
import { clip_cdn_url, create_clip_url, create_embed_url } from "utils/urls";
import { dateTimeDiff } from "utils/date";
import getIsMobile from "hooks/dimensions";

let PROFILE_ICON_SIZE = 50;
let GAME_ICON_SIZE = 20;

const Clip = ({ post = null, videoOptions = null, error = null }) => {
  const isMobile = getIsMobile();
  return typeof post?.id === "string" ? (
    <div
      className={`${styles.container} ${isMobile ? styles.mobile : styles.web}`}
    >
      <Head>
        <title>{post.title} | Shinobi</title>
        <meta
          property="fb:app_id"
          content={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        />
        <meta property="og:title" content={`${post.title} | Shinobi`} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={create_clip_url(post.id)} />

        {typeof post.clip?.thumbnail === "string" && (
          <meta property="og:image" content={post.clip.thumbnail} />
        )}
        <meta
          property="og:description"
          content={`${post.game.name} clip by ${post.posted_by.username}`}
        />
        <meta property="og:video" content={create_embed_url(post.id)} />
        <meta property="og:video:url" content={create_embed_url(post.id)} />
        <meta
          property="og:video:secure_url"
          content={create_embed_url(post.id)}
        />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:height" content={post.clip.height} />
        <meta property="og:video:width" content={post.clip.width} />
      </Head>
      <div className={styles.post}>
        <div className={styles.meta}>
          <div className={styles.header}>
            <Image
              className={styles.picture}
              height={PROFILE_ICON_SIZE}
              width={PROFILE_ICON_SIZE}
              alt={post.posted_by.username}
              src={post.posted_by.picture}
            />
            <div className={styles.names}>
              <div className={styles.username}>
                <span className={styles.titleText}>
                  {post.posted_by.username}
                </span>
                <span className={styles.titleText}>{" \u0387 "}</span>
                <span className={styles.titleText}>
                  {dateTimeDiff(post.created_datetime)} ago
                </span>
              </div>
              <div className={styles.game}>
                <Image
                  className={styles.gameIcon}
                  height={GAME_ICON_SIZE}
                  width={GAME_ICON_SIZE}
                  alt={post.game.name}
                  src={post.game.logo_url}
                />
                <span className={styles.subtitleText}>{post.game.name}</span>
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <span className={styles.titleText}>{post.title}</span>
            {post.tags.length > 0 && (
              <span className={styles.subtitleText}>
                - with {post.tags[0].username}{" "}
                {post.tags.length > 1 && `${post.tags.length - 1} others`}
              </span>
            )}
          </div>
        </div>
        <div className={`${isMobile ? styles.videoMobile : styles.videoWeb}`}>
          <VideoJS options={videoOptions} />
        </div>
      </div>
      <div className={styles.shareCenter}>
        <div className={`${isMobile ? styles.shareMobile : styles.shareWeb}`}>
          <Share post={post} />
        </div>
      </div>
    </div>
  ) : (
    <ClipNotFound error={error} />
  );
};

export default Clip;

export async function getServerSideProps(context) {
  const { post_id } = context.params;

  if (typeof post_id === "string") {
    try {
      const APIKit = await createAPIKit();
      const response = await APIKit.post("/feed/post/", { post_id });
      const { post } = response.data?.payload;

      const videoOptions = {
        // lookup the options in the docs for more options
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: clip_cdn_url(post.clip.url),
            type: "video/mp4",
          },
        ],
      };
      return {
        props: { post, videoOptions },
      };
    } catch (e) {
      return { props: { error: networkError(e) } };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
