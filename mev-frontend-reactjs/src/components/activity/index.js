import React, { useEffect, useState } from "react";
import shape from "../../assets/images/svg/shape-gray.svg";
import { FaArrowRight } from "react-icons/fa";
import "../../assets/css/global.css"
import { useSelector } from "react-redux";


const Activity = () => {
  const allActivities = useSelector((state) => state.activity.allActivity);


  return (
    <div className="feature-card rounded-md">
      <div className="inline-flex items-center py-3 pl-4 pr-4 bg-[#393939] rounded-t-md relative">
        <div className="relative z-20 flex justify-start items-center">
          {/* <img src={item.img} alt="" /> */}
          <h1 className="text-white text-xl ml-2">Your Activity</h1>
        </div>
        <img
          src={shape}
          alt=""
          className="shape absolute h-full right-[-50px]"
        />
      </div>

      <div className="border-2 ActivityBox flex flex-col gap-4 border-[#393939] p-5 rounded-r rounded-b">
        {allActivities?.map((item, index) => (
          <div key={index} className="flex justify-start items-center gap-3">
            <FaArrowRight className="text-green-600" />
            <p className="text-white">{item.activityMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
