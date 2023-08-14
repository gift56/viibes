import { Video } from "@/types";
import { BASE_URL } from "@/utils";
import axios from "axios";
import React from "react";

interface SearchProps {
  videos: Video[];
}

const Searchpage = ({ videos }: SearchProps) => {
  return <div>Searchpage</div>;
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Searchpage;
