import React from "react";

interface ModalProp {
  show: boolean;
  setShow: (event: any) => void;
  setChange?: any;
}

const variants = {
  open: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  closed: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
};

const SettingsModal = ({ show, setShow, setChange }: ModalProp) => {
  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#00000085] z-40 place-items-center flex justify-center transition-all duration-500 overflow-auto ${
        show ? "flex" : "flex"
      }`}
    >
      SettingsModal
    </div>
  );
};

export default SettingsModal;
