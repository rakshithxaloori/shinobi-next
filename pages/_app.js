import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

import "styles/globals.css";
import { description } from "utils/opengraph";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const rootPath = router.pathname.split("/")[1];

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Shinobi - share gaming clips</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {rootPath !== "embed" && <Header />}
      <Component {...pageProps} />
      {rootPath !== "embed" && <Footer />}
    </SessionProvider>
  );
}

export default MyApp;

if (process.NEXT_PUBLIC_CI_CD_STAGE === "production") console.log = () => {};
