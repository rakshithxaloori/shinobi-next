import Link from "next/link";
import { ImTwitter } from "react-icons/im";

const Twitter = ({ text, className, iconSize }) => (
  <Link href={`https://twitter.com/intent/tweet?text=${encodeURI(text)}`}>
    <a className={className} rel="noopener noreferrer" target="_blank">
      <ImTwitter size={iconSize} color="#1DA1F2" />
    </a>
  </Link>
);

export default Twitter;
