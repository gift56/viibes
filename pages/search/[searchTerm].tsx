import React, { useState } from "react";
import { Video } from "@/types";
import { BASE_URL } from "@/utils";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "@/store";

interface SearchProps {
  videos: Video[];
}

const Searchpage = ({ videos }: SearchProps) => {
  const [isAccount, setIsAccount] = useState(true);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  
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
