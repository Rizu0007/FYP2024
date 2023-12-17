import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { API } from "../../api/api";
import "../../assets/css/global.css";
import { Alert } from "antd";

const Buy = () => {
  const [body, setBody] = useState({});
  const [userNetwork, setUserNetwork] = useState("");
  const [alert, setAlert] = useState({});
 

  const handleAlert = () => {
    setTimeout(() => {
      setAlert({ isAlert: false });
    }, 3000);
  };

 

 
  return (
    <>
      {/* {alert.isAlert && (
        <Alert
          className="AlertBox"
          message={alert.message}
          banner
          type={alert.type}
          onClose
        />
      )} */}
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
    <div class=" py-3 md:flex border-4 border-[#589B74] flex items-center justify-center font-bold  text-white  bg-black border-[#00FFA2">
       
    Select Licence
    </div>
    </div>
    <div class="max-w-md mx-auto bg-black  rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 border-2 border-[#589B74]">
      
   <div className="text-xl">
  <h1 className="flex items-center justify-center text-2xl font-bold text-[#589B74]">Start $399 <span className="text-sm">/Year</span> </h1>
  <div className="text-sm flex items-center  justify-center list-disc">
  <ul className="mt-6 text-white gap-3 list-disc ">
            <li>Capital Limit ~10000$</li>
            <li>3-5% profit per Cycle</li>

            <li>min  start balance: ~$361Usd</li>
            <li>12% Bot Fee</li>
            <li>Standard Support</li>
    </ul>
  </div>
  <div className="py-4">
  <button className="  flex items-center justify-center border-2 p-3 border-[#589B74] bg-black mx-60 py-3 ">Buy</button>
  </div>
   </div>
   <div className=" border-2 border-[#589B74]">
    <div className="text-xl">
  <h1 className="flex items-center justify-center text-2xl font-bold text-[#589B74]">Pro  $999 <span className="text-sm">/Year</span> </h1>
  <div className="text-sm flex items-center  justify-center list-disc">
  <ul className="mt-6 text-white gap-3 list-disc ">
            <li>Capital Limit ~20000$</li>
            <li>3-10% profit per Cycle</li>
            <li>min  start balance: ~$961Usd</li>
            <li>07% Bot Fee</li>
            <li> 24/7 Standard Support</li>
    </ul>
  </div>
  <div className="py-4">
  <button className="  flex items-center justify-center border-2 p-3 border-[#589B74] bg-black mx-60 py-3 ">Buy</button>
  </div>
   </div>
   </div>
   <div className="p">
   <div className=" py-2 border-2 border-[#589B74]">
    <div className="text-xl">
  <h1 className="flex items-center justify-center text-2xl font-bold text-[#589B74]">Pro  $1999 <span className="text-sm">/Year</span> </h1>
  <div className="text-sm flex items-center  justify-center list-disc">
  <ul className="mt-6 text-white gap-3 list-disc ">
            <li>Capital Limit ~1000000$</li>
            <li>7-20% profit per Cycle</li>
            <li>min  start balance: ~$1441Usd</li>
            <li>02% Bot Fee</li>
            <li> 24/7 Standard Support</li>
    </ul>
  </div>
  <div className="py-4">
  <button className="  flex items-center justify-center border-2 p-3 border-[#589B74] bg-black mx-60 py-3 ">Buy</button>
  </div>
   </div>
   </div>
   </div>
    
    </div>


  


  
    
    </>
  );
};

export default Buy;
