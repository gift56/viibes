import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import Discover from "./Discover";
import Settings from "./Settings";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/router";
import { topics } from "@/utils/constants";

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

  const router = useRouter();

  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-2 hover:bg-gray-300 xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-start cursor-pointer text-[#f51997] w-full";
  // "xl:border-2 hover:bg-primary dark:hover:bg-gray-800 xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#f51997]";

  const topicStyle =
    "xl:border-2 hover:bg-gray-300 xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-start cursor-pointer text-black w-full";
  // "xl:border-2 hover:bg-primary dark:hover:bg-gray-800 xl:border-gray-300 dark:hover:xl:border-gray-600 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black dark:text-gray-100";

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
        <div className="lg:border-b-2 border-gray-200 xl:pb-2">
          <Link href="/">
            <div className="flex items-center justify-center xl:justify-start cursor-pointer font-semibold text-black rounded gap-3 hover:bg-primary p-3">
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className="text-xl hidden lg:block">Follow Topics</span>
            </div>
          </Link>
        </div>
        <Discover />
        <Settings />
      </div>



      <div
        className={`${
          mobileNav ? "left-0" : "-left-full"
        } lg:hidden flex flex-col h-screen bg-black/40 gap-7 absolute top-0 w-full z-10 transition-all duration-300 overflow-hidden`}
      >
        <div
          ref={modalRef}
          className={`flex flex-col h-full bg-primary gap-5 absolute top-0 p-4 w-[250px] bg-white`}
        >
          <div className="w-full flex items-center justify-end">
            <span className="text-dark" onClick={() => setMobileNav(false)}>
              <MdClose size={25} />
            </span>
          </div>
          <nav className="w-full flex items-start justify-start flex-col gap-6">
            <div className="w-full border-b pb-4">Sign Up button</div>
            <div className="w-full flex flex-col h-[80vh] overflow-y-auto">
              <div className="xl:border-b-2 border-gray-200 xl:pb-2">
                <Link href="/">
                  <div className="flex items-center justify-start xl:justify-start cursor-pointer font-semibold text-black rounded gap-3 hover:bg-primary p-3">
                    <p className="text-2xl">
                      <AiFillHome />
                    </p>
                    <span className="text-xl block">Follow Topics</span>
                  </div>
                </Link>
              </div>
              <div className="xl:border-b-2 xl:border-gray-200 py-4">
                <div className="flex gap-3 flex-col items-start justify-start">
                  {topics.map((item) => (
                    <Link
                      href={`/?topic=${item.name}`}
                      key={item.name}
                      className="w-full"
                    >
                      <div
                        className={
                          topic === item.name ? activeTopicStyle : topicStyle
                        }
                      >
                        <span className="text-2xl font-bold xl:text-md">
                          {item.icon}
                        </span>
                        <span className="font-medium text-md block capitalize">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <Settings />
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default LeftSideBar;
