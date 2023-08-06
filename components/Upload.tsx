import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiVideoUploadLine } from "react-icons/ri";

const Upload = () => {
  const user = null;
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4 shadow-paginationShad pb-2">
      <div className="w-full flex items-center justify-start gap-5 p-6 border-b">
        <img
          src={user ? "" : "/avatar.png"}
          alt="avatar"
          className="w-10 h-10 object-contain rounded-full"
        />
        <div className="w-full cursor-pointer flex items-center justify-start gap-2 select-none text-gray-600">
          <span className="text-base font-normal">Upload a video</span>
          <span>
            <HiOutlinePencilSquare />
          </span>
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <span className="flex items-center justify-start gap-2 text-base font-medium cursor-pointer text-gray-500">
          <span>
            <RiVideoUploadLine size={25} />
          </span>
          <span>Select Video</span>
        </span>
        <button
          //   onClick={handlePost}
          type="button"
          className="text-base border-2 font-medium p-2 rounded-lg w-fit px-8 outline-none bg-[#f51997] text-white border-[#f51997]"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
