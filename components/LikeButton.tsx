import useAuthStore from "@/store";
import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
  const [liked, setLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col justify-center items-center mt-4 cursor-pointer">
        {liked ? (
          <div
            className="bg-gray-200 dark:bg-gray-800 rounded-full p-2 md:p-4 text-secondary"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-3xl" />
          </div>
        ) : (
          <div
            className="bg-gray-200 dark:bg-gray-800 rounded-full p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-3xl" />
          </div>
        )}
        <p
          className="text-md font-semibold
        "
        >
          {likes?.length | 0}
        </p>
      </div>
    </div>
  );
};

export default LikeButton;
