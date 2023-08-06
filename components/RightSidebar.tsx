import { useState } from "react";
import Footer from "./Footer";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";

const RightSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4 h-screen py-5 w-full">
      <div className="relative hidden lg:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white dark:bg-[#1d2225]"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary dark:bg-gray-900 dark:border-gray-800 p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            placeholder="Search Videos and accounts"
          />
          <button
            onClick={handleSearch}
            className="absolute right-6 top-4 md:right-5 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div className="xl:border-b-2 border-gray-200 pb-4 w-full">
        <p className="text-gray-500 font-semibold hidden m-3 mt-4 xl:block dark:text-white">
          Suggested Accounts
        </p>
        <div>
          {[0, 1, 2, 3, 4].slice(0, 6).map((user: any) => (
            <Link href={`/profile/${user?._id}`} key={user?._id}>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-primary dark:hover:bg-gray-700 p-2 font-semibold rounded transition-all">
                <div className="w-8 h-8">
                  <img src="" alt="" />
                </div>
                <div className="hidden xl:block">
                  {/* <p className="flex gap-1 items-center text-md font-bold text-primary dark:text-gray-100 lowercase">
                    {user.userName.replace(" ", "")}{" "}
                    <GoVerified className="text-blue-400" />
                  </p> */}
                  <p className="flex gap-1 items-center text-xs font-bold text-gray-400 dark:text-gray-300 capitalize">
                    User
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
