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
        <Image
          width={62}
          height={62}
          className="rounded-full"
          src="/vibeLogo.svg"
          alt="logo photo"
          layout="responsive"
        />
      </div>
    );

  return <Component {...pageProps} />;
}
