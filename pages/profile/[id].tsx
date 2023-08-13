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
