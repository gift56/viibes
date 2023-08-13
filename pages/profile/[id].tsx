import React, { useState, useEffect } from "react";
import { IUser, Video } from "@/types";
import { BASE_URL } from "@/utils";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";

interface UserProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profilepage = ({ data }: UserProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <MainLayout showRight={false}>
      <div>
        <div className="w-full">
          <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full items-center">
            <div className="w-16 h-16 md:w-32 md:h-32">
              <img
                src={user?.image}
                className="rounded-full"
                alt="user profile"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="flex gap-1 items-center text-base font-bold text-gray-600 capitalize  md:text-2xl tracking-wider justify-center">
                {user?.userName}
                {/* <GoVerified className="text-blue-400" /> */}
              </p>
              <p className="flex gap-1 items-center text-xs font-bold text-gray-400  lowercase md:text-xl">
                {user?.userName.replace(" ", "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  console.log(res.data);
  return {
    props: { data: res.data },
  };
};

export default Profilepage;
