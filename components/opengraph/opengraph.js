import { clip_cdn_url, create_clip_url, create_embed_url } from "utils/urls";

const OpenGraph = ({ post }) => {
  const _clip_url = create_clip_url(post.id);
  const _cdn_url = clip_cdn_url(post.id);

  return (
    <>
      <meta property="og:site_name" content="Shinobi" />
      <meta property="og:title" content={`${post.title} | Shinobi`} />
      <meta property="og:type" content="video.other" />
      <meta property="og:url" content={_clip_url} />

      {typeof post.clip?.thumbnail === "string" && (
        <meta property="og:image" content={post.clip.thumbnail} />
      )}
      <meta
        property="og:description"
        content={`${post.game.name} clip by ${post.posted_by.username}`}
      />
      <meta property="og:video" content={_cdn_url} />
      <meta property="og:video:url" content={_cdn_url} />
      <meta property="og:video:secure_url" content={_cdn_url} />
      <meta property="og:video:type" content="video/mp4" />
      <meta property="og:video:height" content={post.clip.height} />
      <meta property="og:video:width" content={post.clip.width} />
      <meta property="video:tag" content="Shinobi" />
      <meta property="video:tag" content={post.game.name} />
    </>
  );
};

export default OpenGraph;
