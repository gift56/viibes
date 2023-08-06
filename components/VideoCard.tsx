import React from "react";
import { NextPage } from "next";
import { Video } from "@/types";

interface Postprops {
  post: Video;
}

const VideoCard: NextPage<Postprops> = () => {
  return <div>VideoCard</div>;
};

export default VideoCard;
