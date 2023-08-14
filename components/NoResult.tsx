import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface IProps {
  text: string;
}

const NoResult = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-4xl md:text-8xl text-secondary">
        {text === "No Comments yet!" ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-xl md:text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
