import { create_clip_url, create_embed_url } from "utils/urls";

const TwitterOG = ({ post }) => {
  const _clip_url = create_clip_url(post.id);
  const _embed_url = create_embed_url(post.id);
  const _cdn_url = create_clip_url(post.id);
  return (
    <>
      <meta name="twitter:card" content="player" />
      <meta name="twitter:site" content="@Shinobi" />
      <meta name="twitter:url" content={_clip_url} />
      <meta name="twitter:title" content={`${post.title} | Shinobi`} />
      <meta
        name="twitter:description"
        content={`${post.game.name} clip by ${post.posted_by.username}`}
      />
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
