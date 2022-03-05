import Link from "next/link";
import { ImReddit } from "react-icons/im";

const Reddit = ({ title, text, className, iconSize }) => (
  <Link
    href={`https://reddit.com/submit?title=${encodeURI(title)}&text=${encodeURI(
      text
    )}`}
  >
    <a className={className} rel="noopener noreferrer" target="_blank">
      <ImReddit size={iconSize} color="#FF5700" />
    </a>
  </Link>
);

export default Reddit;
