import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR)
    return (
      <div className="w-full fixed bg-white z-40 flex h-screen items-center justify-center place-items-center">
        <div className="w-40 h-40 animate-ping">
          <img
            className="rounded-full w-full h-full object-contain"
            src="/vibeLogo.svg"
            alt="logo photo"
          />
        </div>
      </div>
    );

  return (
    <>
      <Head>
        <title>
          Viibes - Expore the fun in video sharing and Have a happy life
        </title>
        <meta
          name="description"
          content="Expore the fun in video sharing and Have a happy life"
        />
      </Head>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOGGLE_API_TOKEN}`}
      >
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}
