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

  return <MainLayout showRight={false}>hello</MainLayout>;
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
