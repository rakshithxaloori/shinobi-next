import { description, site_name } from "utils/opengraph";
import { clip_cdn_url, create_clip_url, create_embed_url } from "utils/urls";

const OpenGraph = ({ post }) => {
  const _clip_url = create_clip_url(post.id);
  const _cdn_url = clip_cdn_url(post.id);

  return (
    <>
      <meta property="og:site_name" content={site_name} />
      <meta property="og:title" content={`${post.title} - Shinobi`} />
      <meta property="og:type" content="video.other" />
      <meta property="og:url" content={_clip_url} />
      <meta property="og:image" content={post.clip.thumbnail} />
      <meta property="og:description" content={description} />
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
