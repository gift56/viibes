import React from "react";
import axios from "axios";
import { Video } from "@/types";

interface VideoProps {
  videos: Video[];
}

const Homepage = ({ videos }: VideoProps) => {
  console.log(videos);

  return <div>Homepage</div>;
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
