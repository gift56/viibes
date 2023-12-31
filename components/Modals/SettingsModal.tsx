import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useTheme } from "next-themes";
import { HiMoon, HiOutlineSun, HiSun } from "react-icons/hi2";

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
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const modalRef = useRef<any>(null);

  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#00000085] z-40 place-items-center flex justify-center transition-all duration-500 overflow-auto ${
        show ? "flex" : "hidden"
      }`}
    >
      <motion.div
        animate={show ? "open" : "closed"}
        variants={variants}
        ref={modalRef}
        className="lg:w-fit w-[90%] bg-white dark:bg-gray-800 rounded-lg flex flex-col items-start justify-start gap-3 transition-all duration-300  overflow-y-auto p-4"
      >
        <div className="w-full flex items-center justify-end">
          <span
            onClick={() => {
              setShow(false);
            }}
            className="flex items-center justify-center rounded-lg text-red-500 dark:text-white cursor-pointer"
          >
            <MdClose
              size={25}
              className="hover:rotate-180 transition-all duration-300"
            />
          </span>
        </div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white text-center md:text-xl w-full">
          Customize Your Background
        </h2>
        <div className="flex items-center justify-between gap-5 flex-col md:flex-row bg-gray-200 dark:bg-gray-700 px-4 w-full rounded-md md:h-20 py-4 md:py-0">
          <div
            onClick={() => setTheme("light")}
            className={`flex items-center justify-start gap-3 cursor-pointer bg-white h-12 md:h-[60%] rounded-lg px-4 ${
              currentTheme === "light" && "border-2 border-secondary"
            }`}
          >
            <span className="text-[#fca532]">
              <HiSun size={30} />
            </span>
            <span className="text-lg font-semibold select-none text-black">
              Light
            </span>
          </div>
          <div
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-start gap-3 cursor-pointer bg-gray-600 h-12 md:h-[60%] rounded-lg px-4 text-white ${
              currentTheme === "dark" && "border-2 border-secondary"
            }`}
          >
            <span>
              <HiMoon size={30} />
            </span>
            <span className="text-lg font-semibold select-none">Dark</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;
