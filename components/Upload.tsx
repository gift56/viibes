import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Upload = () => {
  const user = null;
  return (
    <div className="w-full flex items-start justify-start gap-5">
      <img
        src={user ? "" : "/avatar.png"}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
    </div>
  );
};

export default Upload;
