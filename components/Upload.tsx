import useAuthStore from "@/store";
import React, { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import UploadModal from "./Modals/UploadModal";

const Upload = () => {
  const { userProfile } = useAuthStore();
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <>
      {userProfile && (
        <div className="w-full flex flex-col items-start justify-start gap-4 shadow-paginationShad pb-2">
          <div className="w-full flex items-center justify-between md:justify-start gap-5 p-6 pt-2 border-b">
            {/* <Link href={`/profile/${post.postedBy._id}`}></Link> */}
            <img
              src={userProfile ? userProfile?.image : "/avatar.png"}
              alt="avatar"
              className="w-10 h-10 object-contain rounded-full"
            />
            <div className="w-full cursor-pointer items-center justify-start gap-2 select-none text-gray-600 hidden sm:flex">
              <span className="text-base font-normal">Upload a video</span>
              <span>
                <HiOutlinePencilSquare />
              </span>
            </div>
            <button
              onClick={() => setUploadOpen(true)}
              type="button"
              className="text-base border-2 font-medium p-2 rounded-lg w-fit px-8 outline-none bg-[#f51997] text-white border-[#f51997]"
            >
              Upload
            </button>
          </div>
        </div>
      )}
      <UploadModal show={uploadOpen} setShow={setUploadOpen} />
    </>
  );
};

export default Upload;
