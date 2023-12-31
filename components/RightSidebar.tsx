import { useState, useEffect } from "react";
import Footer from "./Footer";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import useAuthStore from "@/store";
import { IUser } from "@/types";

const RightSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4 h-screen p-5 w-full overflow-y-auto scrollbar-hide">
      <div className="relative hidden lg:block w-full">
        <form
          onSubmit={handleSearch}
          className="bg-gray-200 dark:bg-[#1d2225] w-full flex items-center border-2 border-gray-200 rounded-full p-3 gap-3"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none w-[90%]"
            placeholder="Search Videos and accounts"
          />
          <button
            onClick={handleSearch}
            className="border-l-2 border-gray-300 text-2xl text-gray-400 pl-3"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div className="lg:border-b-2 border-gray-200 pb-4 w-full">
        <p className="text-gray-500 dark:text-white font-semibold hidden m-3 mt-4 lg:block">
          Suggested Accounts
        </p>
        <div>
          {allUsers.slice(0, 6).map((user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 font-semibold rounded transition-all">
                <div className="w-8 h-8">
                  <img
                    src={user.image}
                    className="rounded-full"
                    alt={`${user.userName} profile`}
                  />
                </div>
                <div className="hidden xl:block">
                  <p className="flex gap-1 items-center text-base font-bold text-gray-600 dark:text-white capitalize">
                    {user.userName}
                    {/* <GoVerified className="text-blue-400" /> */}
                  </p>
                  <p className="flex gap-1 items-center text-xs font-bold text-gray-400 lowercase">
                    @{user.userName.replace(" ", "")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RightSidebar;
