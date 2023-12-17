import React, { useEffect } from "react";
import shape from "../../assets/images/svg/shape-gray.svg";
import { FaArrowRight } from "react-icons/fa";
import "../../assets/css/global.css"
import { useSelector } from "react-redux";

const BotActivity = () => {



  const botActivities = useSelector((state) => state.botactivity.allBotActivity);
  console.log(botActivities)
  return (
    <div className="feature-card rounded-md">
      <div className="inline-flex  items-center py-3 pl-4 pr-4 bg-[#393939] rounded-t-md relative">
        <div className="relative z-20 flex justify-start items-center">
          {/* <img src={item.img} alt="" /> */}
          <h1 className="text-white text-xl ml-2">Bot Activity</h1>
        </div>
        <img
          src={shape}
          alt=""
          className="shape absolute h-full right-[-50px]"
        />
      </div>
         
      <div className="border-2  flex flex-col gap-4 border-[#393939] p-5 h-44 rounded-r rounded-b">
      <div class="container mx-auto py-2">
  <div class="flex justify-center space-x-4">
    <div class="bg-black border-2 border-[#589B74] w-2/5 h-32 p-4">
      <p class="text-white font-bold ">Work Cycle End</p>
      <p className="py-3  flex items-center justify-center">23:50:50</p>
    </div>
    
    <div class="bg-black border-2 border-[#589B74] w-1/3 h-32 p-4">
      <p class="text-white font-bold text-left ">Succefull Deals</p>
      <p className="py-3  flex items-center justify-center">0</p>
    </div>
    
    <div class="bg-black border-2 border-[#589B74]  w-1/3 h-32 p-4">
      <p class="text-white font-bold ">TotaL Porfit  </p>
      <p className="py-3  flex items-center justify-center">~$0.00</p>
    </div>
  </div>
</div>

        {botActivities?.map((item, index) => (
          <div key={index} className="flex justify-start items-center gap-3">
            <FaArrowRight className="text-green-600" />
            <p className="text-white">{item.botActivityMessage}</p>
            <img className="TickMark" src={require("../../assets/images/tick.png")} alt="" />
            <h1 className="text-white py-11">hello export default Hero;</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotActivity;
