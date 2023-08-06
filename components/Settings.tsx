import React from "react";
import { FiSettings } from "react-icons/fi";

const Settings = () => {
  return (
    <div className="w-full pb-16 flex items-center justify-start cursor-pointer gap-4 text-lg font-semibold hover:bg-gray-200 lg:p-4 mt-4 rounded-lg">
      <span>
        <FiSettings size={20} />
      </span>
      <span>Settings</span>
    </div>
  );
};

export default Settings;
