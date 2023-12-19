/* eslint-disable no-console */

import React, { useEffect, useState, useContext } from "react";
import shape from "../../assets/images/svg/shape-gray.svg";
import { API } from "../../api/api";
import { Alert } from "antd";
import "../../assets/css/global.css";

import { LoginContext } from "../../components/ContextProvider";

const Withdraw = ({ progress }) => {
  
  const { transferToken, buyToken } = useContext(LoginContext);

  const [amount, setAmount] = useState("");


  const [speed, setSpeed] = useState(0); // Initialize the speed value
  // //////////////





  // Function to convert Ethereum to USD
  const [ethValue, setEthValue] = useState("");
  const [usdValue, setUsdValue] = useState(null);





  const [tokenToBuy, setTokenToBuy] = useState()
  const [reciverAddress, setReciverAddress] = useState()
  const [tokenAmountToTransfer, setTokenAmountToTransfer] = useState()


  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true);
  }, []);
  const saleRaised = 'NaN%'; // Placeholder for sale raised percentage
  const softCap = 'CC'; // Placeholder for soft cap currency
  const tokenInput = 1; // Placeholder for token input value



  return (
    <>

      <div className="feature-card rounded-md">

        <div className="border-2 min-h-[150px] flex flex-wrap justify-center gap-9 border-[#393939] p-5 rounded-r rounded-b">
          <div className="flex items-center justify-center md-screen ">


          </div>
          <div className="bg-black sh700adow-md w-70 h-30 rounded-xl bg-clip-border border-4 border-[#00FFA2]">
            <div className="p-6">
              <h5 className=" flex items-center justify-center font-bold text-3xl mb-2 font-sans  antialiased underline  text-[#00FFA2] leading-snug tracking-normal text-blue-gray-900">
                Token Sale
              </h5>
              <p className="font-sans text-base antialiased font-light leading-relaxed text-inherit">
                We Provide a platform where anyone buy comsats coin . Users can use Comsats Coin to buy anything in the campus. Don’ts: The system will not allow administrators to edit transaction.
              </p>
              <div class="flex items-center justify-center p-3 space-y-0.5	 mb-4 text-sm text-red-800 rounded-lg  dark:text-red-400 " role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">seedPhrase:</span>  Once you generate the seed phrase, save it securely to recover your wallet in the future.

                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <label htmlFor="tokenAmount" className=" text-xl text-center">
                Amount
              </label>
            </div>
            <div className="flex items-center justify-center">

              <input
                id="tokenAmount"
                type="number"
                // value={tokenToBuy}
                onChange={(e) => setTokenToBuy(e.target.value)}
                // Increased mt-3 to mt-5, py-2 to py-4 for more vertical padding, and px-4 to px-6 for more horizontal padding.
                className="mt-5 py-3 block  w-2/ shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-6"
                placeholder="Enter token amount"
              />
            </div>

            <div className=" flex items-center justify-center p-6 pt-8">
              <button
                onClick={() => buyToken(tokenToBuy)}
                className=" select-none rounded-lg  bg-black border-2 border-[#00FFA2]   py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
              >
                Token Buy
              </button>
            </div>
          </div>
          <div className="bg-black sh700adow-md w-70 h-30 rounded-xl bg-clip-border border-4 border-[#00FFA2]">
            <div className="p-6">
              <h5 className=" flex items-center justify-center font-bold text-3xl mb-2 font-sans  antialiased underline  text-[#00FFA2] leading-snug tracking-normal text-blue-gray-900">
                Transfer Token
              </h5>
              <p className="font-sans text-base antialiased font-light leading-relaxed text-inherit">
                We Provide a platform where anyone buy comsats coin . Users can use Comsats Coin to buy anything in the campus. Don’ts: The system will not allow administrators to edit transaction.
              </p>
              <div class="flex items-center justify-center p-3 space-y-0.5	 mb-4 text-sm text-red-800 rounded-lg  dark:text-red-400 " role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">seedPhrase:</span>  Once you generate the seed phrase, save it securely to recover your wallet in the future.

                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <label htmlFor="tokenAmount" className=" text-xl text-center">
                Enter Reciever Address
              </label>
            </div>
            <div className="flex items-center justify-center">

              <input
                id="tokenAmount"
                // value={reciverAddress}
                onChange={(e) => setReciverAddress(e.target.value)}
                // Increased mt-3 to mt-5, py-2 to py-4 for more vertical padding, and px-4 to px-6 for more horizontal padding.
                className="mt-5 py-3 block  w-2/3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-6"
                placeholder="Enter token amount"
              />
            </div>
            <div className="flex items-center justify-center">
              <label htmlFor="tokenAmount" className=" text-xl text-center">
                Enter Number of tokens                </label>
            </div>
            <div className="flex items-center justify-center">

              <input
                id="tokenAmount"
                type="number"
                // value={tokenAmountToTransfer}
                onChange={(e) => setTokenAmountToTransfer(e.target.value)}
                // Increased mt-3 to mt-5, py-2 to py-4 for more vertical padding, and px-4 to px-6 for more horizontal padding.
                className="mt-5 py-3 block  w-2/3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-6"
                placeholder="Enter token amount"
              />
            </div>

            <div className="flex items-center justify-center">


            </div>

            <div className=" flex items-center justify-center p-6 pt-8">
              <button
                onClick={() => transferToken(reciverAddress, tokenAmountToTransfer)}
                className=" select-none rounded-lg  bg-black border-2 border-[#00FFA2]   py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
              >
                Token Transfer
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Withdraw;
