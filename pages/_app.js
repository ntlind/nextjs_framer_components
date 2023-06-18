import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://cdn.lordicon.com/xdjxvujz.js"
        strategy="afterInteractive"
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <motion.div exit={{ opacity: 0 }}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
