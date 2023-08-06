import React from "react";
import axios from "axios";
import { Video } from "@/types";
import { NoResult, Upload, VideoCard } from "@/components";


interface VideoProps {
  videos: Video[];
}

const Homepage = ({ videos }: VideoProps) => {
  console.log(videos);

  return (
    <div className="w-full flex flex-col items-start gap-4 h-screen overflow-y-auto overflow-x-hidden scrollbar-hide">
      <h2 className="w-full text-xl font-bold sticky top-0 bg-white pt-6 px-4">
        Home
      </h2>
      <div className="flex flex-col gap-4 videos h-full w-full">
        <div className="w-full">
          <Upload />
        </div>
        {videos.length > 0 ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResult text="No Videos Found!" />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/post");

  return {
    props: {
      videos: data,
    },
  };
};

export default Homepage;
