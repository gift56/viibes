import React, { useState } from "react";
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

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#00000085] z-40 place-items-center flex justify-center transition-all duration-500 overflow-auto ${
        show ? "flex" : "flex"
      }`}
    >
      {userProfile ? (
        <motion.div
          animate={show ? "open" : "open"}
          variants={variants}
          className="lg:w-[850px] w-[90%] bg-white rounded-lg flex flex-col items-start justify-between gap-3 transition-all duration-300 h-[550px] overflow-y-auto p-4"
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
              className="w-12 h-12 hover:bg-gray-500 flex items-center justify-center rounded-lg text-red-500 cursor-pointer hover:text-white transition-all duration-300"
            >
              <MdClose
                size={20}
                className="hover:rotate-180 transition-all duration-300"
              />
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          animate={show ? "open" : "open"}
          variants={variants}
          className="w-fit bg-white rounded-lg flex items-center justify-center flex-col gap-3 transition-all duration-300 h-[550px] overflow-y-auto p-4"
        >
          <h2 className="text-2xl font-medium text-gray-800">
            Connect with <b>Viibe</b>
          </h2>
          <p className="text-sm font-normal text-gray-600">
            Join Viibe, the fastest and easiest way to make upload an share the
            fun with friends and the world through videos
          </p>
          <ConnectAccount />
        </motion.div>
      )}
    </div>
  );
};

export default UploadModal;
