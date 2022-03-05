import Link from "next/link";
import { ImFacebook } from "react-icons/im";

const Facebook = ({ shinobi_url, text, className, iconSize }) => (
  <Link
    href={`https://www.facebook.com/sharer/sharer.php?app_id=${
      process.env.FB_APP_ID
    }&u=${encodeURI(shinobi_url)}&quote=${encodeURI(text)}`}
  >
    <a className={className} rel="noopener noreferrer" target="_blank">
      <ImFacebook size={iconSize} color="#4267B2" />
    </a>
  </Link>
);

export default Facebook;
