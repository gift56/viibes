import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();

  const { topic } = router.query;

  const activeTopicStyle =
    "lg:border-2 hover:bg-gray-300 lg:border-secondary px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-secondary";

  const topicStyle =
    "lg:border-2 hover:bg-gray-300 lg:border-gray-300 px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div className="lg:border-b-2 lg:border-gray-200 py-6">
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="text-2xl font-bold xl:text-md">{item.icon}</span>
              <span className="font-medium text-md hidden lg:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
