import Link from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import Discover from "./Discover";
import Footer from "./Footer";

const LeftSideBar = () => {
  return (
    <nav className="flex flex-col items-start justify-start gap-4 h-screen py-5">
      <Link href="/">
        <div className="w-[100px] md:w-[180px] aspect-video sticky top-2 z-10">
          <img
            className="cursor-pointer object-contain w-full h-full"
            src="/vibeLogo.svg"
            alt="viibe-logo"
          />
        </div>
      </Link>
      <div className="w-full flex flex-col h-[80vh] overflow-y-auto">
        <div className="xl:border-b-2 border-gray-200 xl:pb-2">
          <Link href="/">
            <div className="flex items-center justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded gap-3 hover:bg-primary p-3">
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className="text-xl hidden xl:block">Follow Topics</span>
            </div>
          </Link>
        </div>
        <Discover />
        <Footer />
      </div>
    </nav>
  );
};

export default LeftSideBar;
