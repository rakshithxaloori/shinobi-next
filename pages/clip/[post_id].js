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
import { description, site_name } from "utils/opengraph";
import Link from "next/link";

let PROFILE_ICON_SIZE = 50;
let GAME_ICON_SIZE = 20;

const Clip = ({
  post = null,
  videoOptions = null,
  metaTags = [],
  error = null,
}) => {
  const isMobile = getIsMobile();
  return typeof post?.id === "string" ? (
    <div
      className={`${styles.container} ${isMobile ? styles.mobile : styles.web}`}
    >
      <Head>
        <title>
          {post.title} - {post.game.name} - Shinobi
        </title>
        <description></description>
        {metaTags &&
          metaTags.map((metaTag, index) => (
            <meta
              property={metaTag.property}
              key={index}
              content={metaTag.content}
            />
          ))}
      </Head>
      <Link href="/">
        <a className={styles.create}>Create a sharable gaming clip</a>
      </Link>
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
        props: {
          post: post,
          videoOptions,
          metaTags: [..._openGraphMetaTags(post), ..._twitterMetaTags(post)],
        },
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

const _openGraphMetaTags = (post) => {
  const _clip_url = create_clip_url(post.id);
  const _cdn_url = clip_cdn_url(post.clip.url);
  const _embed_url = create_embed_url(post.id);

  return [
    _metaTagObj("og:site_name", site_name),
    _metaTagObj("og:url", _clip_url),
    _metaTagObj("og:title", `${post.title} - Shinobi`),
    _metaTagObj("og:image", post.clip.thumbnail),
    _metaTagObj("og:image:url", post.clip.thumbnail),
    _metaTagObj("og:image:width", post.clip.width),
    _metaTagObj("og:image:height", post.clip.height),
    _metaTagObj("og:description", description),
    _metaTagObj("og:type", "video.other"),
    _metaTagObj("og:video:url", _cdn_url),
    _metaTagObj("og:video:secure_url", _cdn_url),
    _metaTagObj("og:video:duration", post.clip.duration),
    _metaTagObj("og:video:type", "video/mp4"),
    _metaTagObj("og:video:width", post.clip.width),
    _metaTagObj("og:video:height", post.clip.height),
    _metaTagObj("video:tag", post.posted_by.username),
    _metaTagObj("video:tag", "Shinobi"),
    _metaTagObj("video:tag", post.game.name),
    _metaTagObj("fb:app_id", process.env.NEXT_PUBLIC_FACEBOOK_APP_ID),
  ];
};

const _twitterMetaTags = (post) => [
  _metaTagObj("twitter:card", "player"),
  _metaTagObj("twitter:site", "@ShinobiApp"),
  _metaTagObj("twitter:url", create_clip_url(post.id)),
  _metaTagObj("twitter:title", `${post.title} - Shinobi`),
  _metaTagObj("twitter:description", description),
  _metaTagObj("twitter:image", post.clip.thumbnail),
  _metaTagObj("twitter:image:width", post.clip.width),
  _metaTagObj("twitter:image:height", post.clip.height),
  _metaTagObj("twitter:player", create_embed_url(post.id)),
  _metaTagObj("twitter:player:stream:content_type", "video/mp4"),
  _metaTagObj("twitter:player:width", post.clip.width),
  _metaTagObj("twitter:player:height", post.clip.height),
];

const _metaTagObj = (property, content) => ({
  property,
  content,
});
