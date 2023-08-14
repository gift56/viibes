import React from "react";
import axios from "axios";
import { Video } from "@/types";
import { NoResult, Upload, VideoCard } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import { BASE_URL } from "@/utils";

interface VideoProps {
  videos: Video[];
}

const Homepage = ({ videos }: VideoProps) => {
  return (
    <MainLayout showRight={true}>
      <div className="w-full flex flex-col items-start gap-4 h-screen overflow-y-auto overflow-x-hidden scrollbar-hide">
        <h2 className="w-full text-xl font-bold sticky top-0 bg-white pt-6 px-4 dark:bg-black dark:text-white">
          Home
        </h2>
        <div className="flex flex-col gap-4 videos h-full w-full overflow-y-auto">
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
    </MainLayout>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let reponse = null;
  if (topic) {
    reponse = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    reponse = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: reponse.data,
    },
  };
};

export default Homepage;
