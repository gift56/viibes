import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import Discover from "./Discover";
import Settings from "./Settings";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

const LeftSideBar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setMobileNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex flex-col items-start justify-start gap-4 lg:h-screen py-5 w-full">
      <div className="flex items-center gap-4 justify-between px-4 w-full">
        <Link href="/">
          <div className="w-full sticky top-2 z-10 select-none">
            <h2 className="text-2xl font-semibold lg:text-4xl">
              <i>Viibes</i>
            </h2>
          </div>
        </Link>
        <span
          onClick={() => setMobileNav(true)}
          className="cursor-pointer lg:hidden"
        >
          {mobileNav === false && <HiBars3BottomRight size={30} />}
        </span>
      </div>
      <div className="w-full lg:flex flex-col h-[80vh] overflow-y-auto hidden">
        <div className="xl:border-b-2 border-gray-200 xl:pb-2">
          <Link href="/">
            <div className="flex items-center justify-center xl:justify-start cursor-pointer font-semibold text-black rounded gap-3 hover:bg-primary p-3">
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className="text-xl hidden xl:block">Follow Topics</span>
            </div>
          </Link>
        </div>
        <Discover />
        <Settings />
      </div>
      <div
        className={`${
          mobileNav ? "left-0" : "-left-full"
        } tab:hidden flex flex-col h-screen bg-black/40 gap-7 absolute top-0 w-full z-10 transition-all duration-300 `}
      >
        <div
          ref={modalRef}
          className={`flex flex-col h-full bg-primary gap-7 absolute top-0 p-4 w-[250px] bg-white`}
        >
          <div className="w-full flex items-center justify-end">
            <span className="text-dark" onClick={() => setMobileNav(false)}>
              <MdClose size={25} />
            </span>
          </div>
          <nav className="w-full flex items-start justify-start flex-col gap-6"></nav>
        </div>
      </div>
    </nav>
  );
};

export default LeftSideBar;
