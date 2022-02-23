import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

import "styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Shinobi | Shareable gaming clips</title>
        <meta
          name="description"
          content="Create a shareable gaming clip in 2 steps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
