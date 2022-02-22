import Link from "next/link";
import Image from "next/image";

const PLAYSTORE_ICON_HEIGHT = 80;

const PlayStore = () => (
  <Link href="https://play.google.com/store/apps/details?id=cc.shinobi.android">
    <a>
      <Image
        src="/PlayStore.png"
        width={(646 * PLAYSTORE_ICON_HEIGHT) / 250}
        height={PLAYSTORE_ICON_HEIGHT}
        alt="Play Store"
      />
    </a>
  </Link>
);

export default PlayStore;
