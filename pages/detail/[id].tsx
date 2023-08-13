import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import { GoVerified } from "react-icons/go";
import { MdOutlineCancel, MdOutlineVideoLibrary } from "react-icons/md";
import {
  BsDownload,
  BsFillPlayFill,
  BsFillTrash3Fill,
  BsThreeDots,
} from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "@/utils";
import { Video } from "@/types";
import useAuthStore from "@/store";
import LikeButton from "@/components/LikeButton";
import { Comments } from "@/components";
import { motion } from "framer-motion";

interface PostProps {
  postDetails: Video;
}

const VideoDetail = ({ postDetails }: PostProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [dropDown, setDropDown] = useState<any>(null);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile } = useAuthStore();
  const [comment, setComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = videoMuted;
    }
  }, [post, videoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();
    if (userProfile && comment) {
      setPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost({ ...post, comments: data.comments });
      setComment("");
      setPostingComment(false);
    }
  };

  const deleteVideo = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/post/${post._id}`);
      console.log(res.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const variants = {
    open: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    closed: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
  };

  if (!post)
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
    <div className="flex w-full bg-white flex-wrap md:flex-nowrap md:h-screen md:overflow-hidden">
      <div className="relative flex-2 w-full md:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center lg:flex-[2]">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative bg-black">
          <div className="h-[60vh] lg:h-[100vh]">
            <video
              ref={videoRef}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              loop
              onClick={onVideoClick}
            ></video>
          </div>
          <div className="absolute top-[44%] left-[40%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {videoMuted ? (
            <button onClick={() => setVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="lg:h-screen overflow-y-auto w-full lg:flex-[1.2]">
        <div className="relative w-full">
          <div className="mt-10">
            <div className="w-full flex items-start justify-between px-5">
              <div className="flex gap-3 cursor-pointer font-semibold rounded">
                <div className="md:h-20 w-16 h-16">
                  <Link href="/">
                    <img
                      className="rounded-full"
                      src={post.postedBy.image}
                      alt={`${post.postedBy.userName} profile photo`}
                    />
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="flex items-center gap-2  md:text-md font-bold text-primary ">
                        {post.postedBy.userName}
                        {/* <GoVerified className="text-blue-400 text-md" /> */}
                      </p>
                      <p className="font-medium text-sm text-gray-500 lowercase">
                        @{post.postedBy.userName.replace(" ", "")}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <span
                  onClick={() =>
                    setDropDown(dropDown !== post._id ? post._id : null)
                  }
                  className="cursor-pointer"
                >
                  <BsThreeDots size={25} />
                </span>
                <motion.div
                  animate={dropDown === post._id ? "open" : "closed"}
                  variants={variants}
                  className={`w-[200px] bg-white border border-gray-400 flex-col items-start rounded-xl overflow-hidden absolute right-0 z-10 ${
                    dropDown === post._id ? "flex" : "hidden"
                  }`}
                >
                  <div
                    onClick={deleteVideo}
                    className="flex items-center w-full gap-4 justify-start cursor-pointer p-3 text-base font-medium text-gray-600 hover:bg-gray-200 transition-all duration-300"
                  >
                    <span>
                      <BsFillTrash3Fill size={20} />
                    </span>
                    <span>Delete Video</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <p className="px-10 text-lg text-gray-600 font-medium">
              {post.caption}
            </p>
            <div className="mt-5 px-10">
              {userProfile && (
                <LikeButton
                  likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
              )}
            </div>
            <Comments
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              comments={post.comments}
              postingComment={postingComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default VideoDetail;
