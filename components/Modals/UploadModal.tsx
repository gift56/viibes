import React from "react";

interface ModalProp {
  show: boolean;
  setShow: (event: any) => void;
  setChange?: any;
}

const UploadModal = ({ show, setShow, setChange }: ModalProp) => {
  return <div>UploadModal</div>;
};

export default UploadModal;
