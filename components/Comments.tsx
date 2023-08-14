import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import useAuthStore from "@/store";
import { IUser } from "@/types";
import { NoResult } from ".";

interface IProps {
  postingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  postingComment,
  comment,
  setComment,
  addComment,
  comments,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <>
      <div className="border-y border-gray-200 pt-4 px-10 bg-[#f8f8f8] dark:bg-gray-800 lg:pb-0 pb-[100px]">
        <div className="overflow-scroll lg:h-[290px]">
          {comments?.length ? (
            comments.map((item, index) => (
              <>
                {allUsers.map(
                  (user: IUser) =>
                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                      <div className="p-2 items-center" key={index}>
                        <Link href={`/profile/${user._id}`}>
                          <div className="flex gap-3 items-start">
                            <div className="w-8 h-8">
                              <img
                                src={user.image}
                                className="rounded-full"
                                alt="user profile"
                              />
                            </div>
                            <div className="hidden xl:block">
                              <p className="flex gap-1 items-center text-base font-bold text-gray-900 dark:text-white capitalize">
                                {user.userName}
                                {/* <GoVerified className="text-blue-400" /> */}
                              </p>
                              <p className="flex gap-1 items-center text-xs font-bold text-gray-400 lowercase">
                                @{user.userName.replace(" ", "")}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="mt-3">
                          <p>{item.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </>
            ))
          ) : (
            <NoResult text="No Comments yet!" />
          )}
        </div>
      </div>

      {userProfile && (
        <div className="pb-6 px-2 md:px-10 w-full mt-3">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
              className="bg-gray-100 dark:bg-gray-800 px-4 h-12 text-base font-medium border w-[100%] md:w-[500px] lg:w-[350px] border-gray-100 focus:outline-none flex-1 rounded-lg focus:border-secondary"
            />
            <button
              className="text-base text-gray-100 bg-secondary text-center rounded font-medium px-7 w-fit outline-none"
              onClick={addComment}
            >
              {postingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Comments;
