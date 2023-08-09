import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudDownloadAlt } from "react-icons/fa";
import axios from "axios";
import useAuthStore from "@/store";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "@/utils/constants";
import { client } from "@/utils/client";
import { BASE_URL } from "@/utils";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { ConnectAccount } from "..";

interface ModalProp {
  show: boolean;
  setShow: (event: any) => void;
  setChange?: any;
}

const UploadModal = ({ show, setShow, setChange }: ModalProp) => {
  const [isLoading, setIsloading] = useState(false);
  const [dots, setDots] = useState(".");
  const [wrongFileType, setWrongFileType] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [caption, setCaption] = useState("");
  const [cartegory, setCartegory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsloading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsloading(false);
        });
    } else {
      setIsloading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && cartegory) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: cartegory,
      };
      await axios.post(`${BASE_URL}/api/post`, document);
      setShow(false);
    }
  };

  const variants = {
    open: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    closed: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return ".";
        } else {
          return prevDots + ".";
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#00000085] z-40 place-items-center flex justify-center transition-all duration-500 overflow-auto ${
        show ? "flex" : "hidden"
      }`}
    >
      {userProfile ? (
        <motion.div
          animate={show ? "open" : "closed"}
          variants={variants}
          className="lg:w-[850px] w-[90%] bg-white rounded-lg flex flex-col items-start justify-start gap-3 transition-all duration-300 h-[550px] overflow-y-auto p-4"
        >
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex flex-col items-start justify-start w-full">
              <p className="text-2xl font-bold">Upload a Video</p>
              <p className="text-md text-gray-400">
                Post videos to your account
              </p>
            </div>
            <span
              onClick={() => {
                setShow(false);
              }}
              className="w-12 h-12 hover:bg-gray-400 flex items-center justify-center rounded-lg text-red-500 cursor-pointer hover:text-white transition-all duration-300"
            >
              <MdClose
                size={20}
                className="hover:rotate-180 transition-all duration-300"
              />
            </span>
          </div>
          <div className="w-full grid grid-cols-1 justify-start items-center md:grid-cols-2 md:justify-between gap-6">
            <div className="w-full">
              <div
                className={`border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none w-[260px] h-[400px] cursor-pointer hover:bg-gray-100 transition-all ${
                  videoAsset?.url ? "p-0" : "p-10"
                }`}
              >
                {isLoading ? (
                  <p>Uploading{dots}</p>
                ) : (
                  <div>
                    {videoAsset ? (
                      <div className="w-full">
                        <video
                          src={videoAsset?.url}
                          loop
                          controls
                          className="rounded-xl h-[400px] bg-black w-full"
                        ></video>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-xl">
                            <FaCloudDownloadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p className="font-semibold text-xl">Upload Video</p>
                        </div>
                        <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                          MP4 or WebM or ogg <br />
                          720x1280 or higher <br />
                          Up to 10 minutes <br />
                          Less than 2GB
                        </p>
                        <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-25 outline-none">
                          Select File
                        </p>
                        <input
                          type="file"
                          name="upload-video"
                          onChange={uploadVideo}
                          className="w-0 h-0 hidden"
                          accept="video/mp4, video/webm, video/ogg"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
              {wrongFileType && (
                <p className="font-semibold w-[250px] text-center text-red-400 text-xl mt-4">
                  Please select a video file
                </p>
              )}
              {videoAsset?.url && (
                <label className="bg-[#f51997] mt-5 rounded text-white text-md font-medium py-2 w-fit px-10 cursor-pointer block">
                  Change Video
                  <input
                    type="file"
                    name="upload-video"
                    onChange={uploadVideo}
                    className="w-0 h-0 hidden"
                    accept="video/mp4, video/webm, video/ogg"
                  />
                </label>
              )}
            </div>
            <div className="flex flex-col gap-3 pb-10 w-full lg:w-max">
              <label className="text-md font-medium">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="p-2 rounded outline-none text-md border-2 border-gray-200"
              />
              <label className="text-md font-medium">Choose a Catergory</label>
              <select
                className="p-2 rounded outline-none text-md capitalize border-2 border-gray-200 lg:p-4 cursor-pointer"
                onChange={(e) => setCartegory(e.target.value)}
              >
                {topics.map((topic) => (
                  <option
                    key={topic.name}
                    className="capitalize outline-none bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                    value={topic.name}
                  >
                    {topic.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-6 mt-10">
                <button
                  onClick={() => router.push("/")}
                  type="button"
                  className="text-md border-2 font-medium p-2 rounded w-28 lg:w-44 outline-none border-gray-300"
                >
                  Discard
                </button>

                <button
                  onClick={handlePost}
                  type="button"
                  className="text-md border-2 font-medium p-2 rounded  w-28 lg:w-44 outline-none bg-[#f51997] text-white border-[#f51997]"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          animate={show ? "open" : "closed"}
          variants={variants}
          className="w-fit bg-white rounded-lg flex items-center justify-center flex-col gap-3 transition-all duration-300 overflow-y-auto p-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Connect with <b>Viibe</b>
          </h2>
          <p className="text-sm md:text-base font-normal text-gray-600 text-center">
            Join Viibe, the fastest and easiest way to make upload and <br />{" "}
            share the fun with friends and the world through videos
          </p>
          <ConnectAccount />
        </motion.div>
      )}
    </div>
  );
};

export default UploadModal;
