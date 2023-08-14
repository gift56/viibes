import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { Video } from "@/types";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsThreeDots,
  BsDownload,
  BsFillTrash3Fill,
} from "react-icons/bs";
import Link from "next/link";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { motion } from "framer-motion";
import useAuthStore from "@/store";

interface Postprops {
  post: Video;
}

const VideoCard: NextPage<Postprops> = ({ post }) => {
  const { userProfile } = useAuthStore();
  const [dropDown, setDropDown] = useState<any>(null);
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);

  const onVideoPress = () => {
    if (playing) {
      currentVideoRef.current?.pause();
      setPlaying(false);
    } else {
      currentVideoRef.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    currentVideoRef.current = videoRef.current;

    if (videoRef?.current) {
      videoRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newScreen = screenWidth <= 714 ? true : false;
      setIsHover(newScreen);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHover(true);
    currentVideoRef.current?.play();
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    currentVideoRef.current?.pause();
    setPlaying(false);
  };

  const variants = {
    open: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    closed: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div className="flex items-center justify-between w-full px-3 lg:px-0">
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <img
                className="rounded-full w-full h-full object-cover"
                src={post.postedBy.image}
                alt="profile photo"
              />
            </Link>
          </div>

          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex flex-col items-start gap-1">
                <p className="flex items-center gap-2 md:text-base font-bold text-gray-800 dark:text-gray-200">
                  {post.postedBy.userName} {` `}
                  {/* <GoVerified className="text-blue-400 text-md" /> */}
                </p>
                <p className="lowercase font-medium text-xs text-gray-500 hidden md:block dark:text-gray-300">
                  @{post.postedBy.userName.replace(" ", "")}
                </p>
              </div>
            </Link>
            <p className="text-gray-600 font-medium md:text-base mt-1 md:mt-3 dark:text-gray-200">
              {post.caption}
            </p>
          </div>
        </div>
        <div className="relative">
          <span
            onClick={() => setDropDown(dropDown !== post._id ? post._id : null)}
            className="cursor-pointer"
          >
            <BsThreeDots size={25} />
          </span>
          <motion.div
            animate={dropDown === post._id ? "open" : "closed"}
            variants={variants}
            className={`w-[200px] bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 flex-col items-start rounded-xl overflow-hidden absolute right-0 z-10 ${
              dropDown === post._id ? "flex" : "hidden"
            }`}
          >
            <Link
              href={`/detail/${post._id}`}
              className="flex items-center w-full gap-4 justify-start cursor-pointer p-3 border-b border-gray-400 text-base font-medium text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 rounded-tl-lg rounded-tr-lg"
            >
              <span>
                <MdOutlineVideoLibrary size={20} />
              </span>
              <span>Video Detail</span>
            </Link>
            {userProfile && (
              <a
                href={post.video.asset.url}
                download
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center w-full gap-4 justify-start cursor-pointer p-3 text-base font-mediumtext-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 rounded-tl-lg rounded-tr-lg"
              >
                <span>
                  <BsDownload size={20} />
                </span>
                <span>Download Video</span>
              </a>
            )}
            {/* <div className="flex items-center w-full gap-4 justify-start cursor-pointer p-3 text-base font-medium text-gray-600 hover:bg-gray-200 transition-all duration-300">
              <span>
                <BsFillTrash3Fill size={20} />
              </span>
              <span>Delete Video</span>
            </div> */}
          </motion.div>
        </div>
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 relative w-full items-center justify-center"
      >
        <div className="rounded-3xl">
          <div>
            <video
              src={post.video.asset.url}
              loop
              ref={videoRef}
              className="md:w-fit aspect-video w-[90%] mx-auto rounded-2xl cursor-pointer bg-gray-300"
            ></video>
          </div>
          {isHover && (
            <div className="absolute bottom-[0%] w-[90%] cursor-pointer left-[5%] sm:w-[70%] sm:left-[15%] lg:left-0 lg:bottom-0 flex gap-10 items-end justify-between p-3 lg:w-full bg-black/20 h-full rounded-2xl">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-white text-2xl md:text-3xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-white text-2xl md:text-3xl lg:text-4xl" />
                </button>
              )}
              {videoMuted ? (
                <button onClick={() => setVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-2xl md:text-3xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-2xl md:text-3xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
