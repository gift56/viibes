import React, { useState } from "react";
import { IUser, Video } from "@/types";
import { BASE_URL } from "@/utils";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "@/store";
import MainLayout from "@/layouts/MainLayout";
import { NoResult, VideoCard } from "@/components";
import Link from "next/link";

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
        <div className="flex gap-10 mb-10 mt-6 border-b-2 border-gray-200 bg-white w-full">
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

        {isAccount ? (
          <div className="md:mt-16">
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, index: number) => (
                <Link href={`/profile/${user._id}`} key={index}>
                  <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                    <div>
                      <img src={user.image} className="rounded-full" />
                    </div>
                    <div className="hidden xl:block">
                      <p className="flex gap-1 items-center text-base font-bold text-primary capitalize">
                        {user.userName}
                        {/* <GoVerified className="text-blue-400" /> */}
                      </p>
                      <p className="flex gap-1 items-center text-xs font-bold text-gray-400  lowercase">
                        @{user.userName.replace(" ", "")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResult text={`No video results for ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {videos.length ? (
              videos.map((video: Video, index) => (
                <VideoCard post={video} key={index} />
              ))
            ) : (
              <NoResult text={`No video results for ${searchTerm}`} />
            )}
          </div>
        )}
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
