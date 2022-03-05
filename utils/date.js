export const dateTimeDiff = (dateStr) => {
  const dateThen = new Date(dateStr);
  const dateNow = new Date();
  let dateDiff = dateNow.getTime() - dateThen.getTime();

  if (Math.floor(dateDiff / (1000 * 3600 * 24 * 365)) > 0)
    dateDiff = `${Math.floor(dateDiff / (1000 * 3600 * 24 * 365))}y`;
  else if (Math.floor(dateDiff / (1000 * 3600 * 24 * 30)) > 0)
    dateDiff = `${Math.floor(dateDiff / (1000 * 3600 * 24 * 30))}mo`;
  else if (Math.floor(dateDiff / (1000 * 3600 * 24)) > 0)
    dateDiff = `${Math.floor(dateDiff / (1000 * 3600 * 24))}d`;
  else if (Math.floor(dateDiff / (1000 * 3600)) > 0)
    dateDiff = `${Math.floor(dateDiff / (1000 * 3600))}h`;
  else if (Math.floor(dateDiff / (1000 * 60)) > 0)
    dateDiff = `${Math.floor(dateDiff / (1000 * 60))}mi`;
  else dateDiff = `${Math.floor(dateDiff / 1000)}s`;

  return dateDiff;
};
