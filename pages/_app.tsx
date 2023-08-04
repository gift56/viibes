import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR)
    return (
      <div className="w-full fixed bg-white z-40 flex h-screen items-center justify-center place-items-center">
        <div className="w-40 h-40">
          <Image
            width={40}
            height={40}
            className="rounded-full w-full h-full"
            src="/vibeLogo.svg"
            alt="logo photo"
            layout="responsive"
          />
        </div>
      </div>
    );

  return <Component {...pageProps} />;
}
