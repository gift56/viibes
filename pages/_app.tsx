import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import Image from "next/image";
import Head from "next/head";
import { LeftSideBar, RightSidebar } from "@/components";

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
      <main className="xl:w-[1200px] m-auto overflow-hidden h-screen flex items-start justify-between flex-col lg:flex-row">
        <div className="lg:flex-[1] w-full border-b lg:border-none">
          <LeftSideBar />
        </div>
        <div className="flex-[2]">
          <Component {...pageProps} />
        </div>
        <div className="lg:flex-[1] hidden lg:flex">
          <RightSidebar />
        </div>
      </main>
    </>
  );
}
