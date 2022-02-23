import Head from "next/head";

import VideoJS from "components/video";
import ClipNotFound from "components/clipnotfound";

import { createAPIKit } from "utils/APIKit";
import { clip_cdn_url, create_clip_url, create_embed_url } from "utils/urls";

const Clip = ({ post, videoOptions }) => {
  return typeof post?.id === "string" ? (
    <div>
      <Head>
        <title>{post.title} | Shinobi</title>
        <meta
          property="fb:app_id"
          content={process.env.REACT_APP_FACEBOOK_APP_ID}
        />
        <meta property="og:title" content={`${post.title} | Shinobi`} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={create_clip_url(post.id)} />
        <meta property="og:image" content={post.clip.thumbnail} />
        <meta
          property="og:description"
          content={`${post.game.name} clip by ${post.posted_by.username}`}
        />
        <meta property="og:video" content={create_embed_url(post.id)} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:height" content={post.clip.height} />
        <meta property="og:video:width" content={post.clip.width} />
      </Head>
      <VideoJS options={videoOptions} />
    </div>
  ) : (
    <ClipNotFound />
  );
};

export default Clip;

export async function getServerSideProps(context) {
  const { post_id } = context.params;

  if (typeof post_id === "string") {
    const APIKit = await createAPIKit();
    try {
      const response = await APIKit.post("feed/post/", { post_id });
      const { post } = response.data.payload;

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
      console.log("API Error", e.response?.data?.detail);
    }
  }

  return { props: {} };
}
