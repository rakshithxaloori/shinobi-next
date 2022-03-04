import { description } from "utils/opengraph";
import { create_embed_url } from "utils/urls";

const TwitterOG = ({ post }) => {
  const _embed_url = create_embed_url(post.id);

  return (
    <>
      <meta name="twitter:card" content="player" />
      <meta name="twitter:title" content={`${post.title} - Shinobi`} />
      <meta name="twitter:site" content="@ShinobiApp" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:player" content={_embed_url} />
      <meta name="twitter:player:width" content={post.clip.width} />
      <meta name="twitter:player:height" content={post.clip.height} />
      <meta name="twitter:image" content={post.clip.thumbnail} />
    </>
  );
};

export default TwitterOG;
