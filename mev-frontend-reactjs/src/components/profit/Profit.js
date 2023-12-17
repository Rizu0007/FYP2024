import React from "react";
import Settings from "../../pages/settings";
import { IoCloseSharp } from "react-icons/io5";
import Profit from "../../pages/Profitsetting";

const ProfitWith = ({ setShowProfit }) => {
  return (
    <div className="fixed z-50 w-full transition-all h-screen top-0 left-0 flex justify-center items-center  ">
      <div
        onClick={() => setShowProfit(false)}
        className="fixed z-50 opacity-25  transition-all bg-white w-full h-screen top-0 left-0 flex justify-center items-center  "
      ></div>
      {/* <div
        className="text-right absolute z-[100] top-5 bg-[#589b74] h-[60px] w-[60px] flex justify-center items-center rounded-full right-5 cursor-pointer"
        onClick={() => setShowSettings(false)}
      >
        <button className="text-white px-4 py-2 rounded-md md:block hidden">
          <IoCloseSharp className="text-white text-4xl" />
        </button>
      </div> */}
      <div className="flex flex-col m-3 relative transition-all  bg-black z-50 border-[#393939] border-[3px] rounded-xl ">
        <div className="bg-black p-4 w-full h-[750px] overflow-auto  rounded ">
          <div className="text-center my-5">
            <h1 className="text-3xl uppercase font-bold text-[#589b74]">
              Settings
            </h1>
          </div>
          <Profit/>
        </div>
      </div>
    </div>
  );
};

export default ProfitWith;
