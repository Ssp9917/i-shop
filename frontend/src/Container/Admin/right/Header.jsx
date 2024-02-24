import React from "react";
import { FaUserTie } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const Header = () => {
  return (
    <div className="h-14  bg-[#449DFE] flex items-center justify-between">
      <div className="flex items-center">
        <div
          className="text-red-500 w-12 h-12 mt-2 inline-block "
          viewBox="0 0 24 24"
        >
          <FaUserTie size={40} />
        </div>
        <span className="text-2xl font-bold ml-1 text-[#ddec3c]">
          Sonu Sharma
        </span>
      </div>

      <div className="text-red-500 w-12 h-12 mt-2 inline-block "
      
      >
        <IoMdLogOut size={40}/>
      </div>
    </div>
  );
};

export default Header;
