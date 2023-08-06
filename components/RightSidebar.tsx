import React from "react";
import Footer from "./Footer";
import Link from "next/link";

const RightSidebar = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 h-screen py-5 w-full">
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
