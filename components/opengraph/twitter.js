import { description, site_name } from "utils/opengraph";
import { clip_cdn_url, create_clip_url, create_embed_url } from "utils/urls";

const TwitterOG = ({ post }) => {
  const _clip_url = create_clip_url(post.id);
  const _embed_url = create_embed_url(post.id);
  const _cdn_url = clip_cdn_url(post.clip.url);
  return (
    <>
      <meta name="twitter:card" content="player" />
      <meta name="twitter:site" content={site_name} />
      <meta name="twitter:url" content={_clip_url} />
      <meta name="twitter:title" content={`${post.title} - Shinobi`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={post.clip.thumbnail} />
      <meta name="twitter:player" content={_embed_url} />
      <meta name="twitter:player:stream" content={_cdn_url} />
      <meta name="twitter:player:stream:content_type" content="video/mp4" />
      <meta name="twitter:player:width" content={post.clip.width} />
      <meta name="twitter:player:height" content={post.clip.height} />
    </>
  );
};

export default TwitterOG;
