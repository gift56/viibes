import React, { useState } from "react";
import { IUser, Video } from "@/types";
import { BASE_URL } from "@/utils";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "@/store";
import MainLayout from "@/layouts/MainLayout";

interface SearchProps {
  videos: Video[];
}

const Searchpage = ({ videos }: SearchProps) => {
  const [isAccount, setIsAccount] = useState(true);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const Accounts = isAccount ? "border-b-2 border-black" : "text-gray-400";

  const isVideos = !isAccount ? "border-b-2 border-black" : "text-gray-400";

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout showRight={false}>
      <div className="w-full px-5">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white dark:bg-[#1d2225] w-full">
          <p
            className={`text-xl font-semibold cursor-pointer pb-2 mt-2 ${Accounts}`}
            onClick={() => setIsAccount(true)}
          >
            Accounts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer pb-2 mt-2 ${isVideos}`}
            onClick={() => setIsAccount(false)}
          >
            Videos
          </p>
        </div>
      </div>
    </MainLayout>
  );
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
