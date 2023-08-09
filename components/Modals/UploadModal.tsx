import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaCloudDownloadAlt } from "react-icons/fa";
import axios from "axios";
import useAuthStore from "@/store";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "@/utils/constants";

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

  return <div>UploadModal</div>;
};

export default UploadModal;
