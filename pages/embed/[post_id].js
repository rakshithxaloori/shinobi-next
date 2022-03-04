import Head from "next/head";
import { createAPIKit, networkError } from "utils/APIKit";

import styles from "styles/Embed.module.css";

import ClipNotFound from "components/clip/clipnotfound";
import VideoJS from "components/clip/video";
import { clip_cdn_url } from "utils/urls";

const Embed = ({ post = null, videoOptions = null, error = null }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {post.title} - {post.game.name} - Shinobi
        </title>
      </Head>
      {typeof post?.id === "string" ? (
        <div className={styles.videoParent}>
          <VideoJS options={videoOptions} />
        </div>
      ) : (
        <ClipNotFound error={error} />
      )}
    </div>
  );
};

export default Embed;

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
