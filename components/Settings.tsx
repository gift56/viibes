import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { SettingsModal } from ".";

const Settings = () => {
  const [openSetting, setOpenSetting] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpenSetting(true)}
        className="w-full pb-16 flex items-center justify-start cursor-pointer gap-4 text-lg font-semibold hover:bg-gray-200 lg:p-4 mt-4 rounded-lg"
      >
        <span>
          <FiSettings size={20} />
        </span>
        <span>Theme Settings</span>
      </div>
      <SettingsModal show={openSetting} setShow={setOpenSetting} />
    </>
  );
};

export default Settings;
