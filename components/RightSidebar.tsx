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
    <div className="flex flex-col items-start justify-start gap-4 h-screen py-5 w-full overflow-y-auto scrollbar-hide">
      <div className="relative hidden lg:block">
        <form
          onSubmit={handleSearch}
          className="bg-gray-200 w-full flex items-center border-2 border-gray-200 rounded-full p-3 gap-3"
          // dark:bg-[#1d2225]
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none w-[90%]"
            placeholder="Search Videos and accounts"
            // dark:bg-gray-900 dark:border-gray-800
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
        <p className="text-gray-500 font-semibold hidden m-3 mt-4 lg:block">
          Suggested Accounts
        </p>
        <div>
          {[0, 1, 2, 3, 4].slice(0, 6).map((user: any) => (
            <Link href={`/profile/${user?._id}`} key={user?._id}>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 font-semibold rounded transition-all">
                {/* dark:hover:bg-gray-700 */}
                <div className="w-8 h-8">
                  <img src="" alt="" />
                </div>
                <div className="hidden lg:block">
                  {/* <p className="flex gap-1 items-center text-md font-bold text-primary dark:text-gray-100 lowercase">
                    {user.userName.replace(" ", "")}{" "}
                    <GoVerified className="text-blue-400" />
                  </p> */}
                  <p className="flex gap-1 items-center text-xs font-bold text-gray-400 capitalize">
                    {/* dark:text-gray-300 */}
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
