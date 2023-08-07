import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { Video } from "@/types";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import Link from "next/link";

interface Postprops {
  post: Video;
}

const VideoCard: NextPage<Postprops> = ({ post }) => {
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

  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div>
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
                <p className="flex items-center gap-2 md:text-base font-bold text-primary">
                  {post.postedBy.userName} {` `}
                  {/* <GoVerified className="text-blue-400 text-md" /> */}
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            <p className="text-gray-600 font-medium md:text-base mt-1 md:mt-3">
              {post.caption}
            </p>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 relative w-full items-center justify-center"
      >
        <div className="rounded-3xl">
          <Link href={`/details/${post._id}`}>
            <video
              src={post.video.asset.url}
              loop
              ref={videoRef}
              className="md:w-fit aspect-video w-[90%] mx-auto rounded-2xl cursor-pointer bg-gray-400"
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-[7%] md:bottom-8 w-[90%] cursor-pointer left-[5%] sm:w-[70%] sm:left-[15%] lg:left-0 flex gap-10 items-end justify-between p-3 lg:w-full bg-black/30 h-[90%] rounded-3xl">
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
