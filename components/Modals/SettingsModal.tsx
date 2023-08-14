import React from "react";

interface ModalProp {
  show: boolean;
  setShow: (event: any) => void;
  setChange?: any;
}

const SettingsModal = ({ show, setShow, setChange }: ModalProp) => {
  return <div>SettingsModal</div>;
};

export default SettingsModal;
