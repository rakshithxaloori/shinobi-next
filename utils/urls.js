export const create_clip_url = (post_id) =>
  `https://shinobi.cc/clip/${post_id}`;

export const create_embed_url = (post_id) =>
  `https://shinobi.cc/embed/${post_id}`;

export const clip_cdn_url = (templateUrl) => {
  let videoUri = templateUrl;
  // TODO decide based on internet speed
  videoUri = videoUri.replace("{}", "4");
  return videoUri;
};
