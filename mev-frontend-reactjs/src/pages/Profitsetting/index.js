/* eslint-disable no-console */

import { Alert, Switch } from "antd";
import React, { useState } from "react";
import { FaArrowRight, FaCog } from "react-icons/fa";
import "../../assets/css/global.css";
import Web3 from "web3";
import { API } from "../../api/api";

const Profit = () => {
  const [alert, setAlert] = useState({});
  const [body, setBody] = useState({});
  const [price, setPrice] = useState(0);
  const [percent, setPercent] = useState(0);
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handlePrecentChange = (e) => {
    setPercent(e.target.value);
  };
  const handleAlert = () => {
    setTimeout(() => {
      setAlert({ isAlert: false });
    }, 3000);
  };

 
  

  

  return (
    <>
      {alert.isAlert && (
        <Alert
          className="AlertBox"
          message={alert.message}
          banner
          type={alert.type}
          onClose
        />
      )}
      <div className="py-6">
        <div className="custom-container container">
          <div className="flex flex-wrap gap-2">
            <div className="  justify-center rounded-md block w-fit items-center overflow-hidden">
              <button className="text-white p-3 tab-btn active rounded border-r mb-2 border-[#393939]">
              Wallet to Withdraw

              </button>
              <div className="flex md:flex-row flex-col mt-0 justify-start items-center gap-4">
              <div class="mb-6">

    
</div>
<input type="text" id="default-input" class=" bg-black  border border-[#00FFA2] text-white text-sm rounded-lg  block w-96 p-2.5  " />
              </div>
            </div>

            
          </div>

         
         
        

          <div className=" mt-6  rounded-md flex items-center overflow-hidden">
            <button className="text-white p-4 tab-btn active rounded border-r border-[#393939]">
            Withdrawal settings

            </button>
          </div>
          <div className="flex md:flex-row flex-col mt-4 justify-start items-center gap-4">
           
            <button
              className="text-white cycleBtn p-4 tab-btn rounded border border-[#393939]"
            >
 menual
            </button>
            <button
              className="text-white cycleBtn active p-4 tab-btn rounded border border-[#393939]"
            >
                          at the end of the each cycle

            </button>
            
          </div>
          <div className=" mt-6  rounded-md flex items-center overflow-hidden">
            <button className="text-white p-4 tab-btn active rounded border-r border-[#393939]">
           Bot Fee option

            </button>
          </div>
          <div className="flex md:flex-row flex-col mt-4 justify-start items-center gap-4">
           
            <button
              className="text-white cycleBtn p-4 tab-btn rounded border border-[#393939]"
            >
Pay a fee on each transaction            </button>
            <button
              className="text-white cycleBtn active p-4 tab-btn rounded border border-[#393939]"
            >
at the end of each cycle
            </button>
            
          </div>

          <div className="">
            
            <div className=" mt-9   flex-wrap justify-between items-center md:gap-4 ">
            By default, all profits remain in ETH
              <div>
              

                <button className="text-white p-4 tab-btn active rounded border border-[#393939]">
                  <Switch className="mr-2 "  /> 
                </button>
                <div>
                Convert profits to stablecoins (USDT) (available on PRO and MAX licenses)
                </div>
                

              </div>
              <div>
                <button
                  
                  className="flex py-4 px-6 sv rounded justify-between items-center gap-4 bg-[#0E1F17] border border-[#589B74]"
                >
                  Ok <FaArrowRight  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profit;
