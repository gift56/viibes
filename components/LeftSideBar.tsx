import Image from "next/image";
import Link from "next/link";
import React from "react";

const LeftSideBar = () => {
  return (
    <nav className="flex flex-col items-start justify-start gap-8 h-screen py-5">
      <Link href="/">
        <div className="w-[100px] md:w-[180px] aspect-video sticky top-2 z-10 -translate-y-5">
          <img
            className="cursor-pointer object-contain w-full h-full"
            src="/vibeLogo.svg"
            alt="viibe-logo"
          />
        </div>
      </Link>
    </nav>
  );
};

export default LeftSideBar;
