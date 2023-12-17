/* eslint-disable no-console */

import React, { useEffect, useState, useContext } from "react";
import shape from "../../assets/images/svg/shape-gray.svg";
import { API } from "../../api/api";
import { Alert } from "antd";
import "../../assets/css/global.css";


const Withdraw = ({ progress }) => {

  const [amount, setAmount] = useState("");
 

  const [speed, setSpeed] = useState(0); // Initialize the speed value
  // //////////////



 

  // Function to convert Ethereum to USD
  const [ethValue, setEthValue] = useState("");
  const [usdValue, setUsdValue] = useState(null);








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

        <div className="border-2 min-h-[150px] flex flex-wrap justify-center gap-28 border-[#393939] p-5 rounded-r rounded-b">
        <div className="flex items-center justify-center md-screen p-28">
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
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
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
                  value={tokenInput}
                  // Increased mt-3 to mt-5, py-2 to py-4 for more vertical padding, and px-4 to px-6 for more horizontal padding.
                  className="mt-5 py-3 block  w-2/ shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-6"
                  placeholder="Enter token amount"
                />
                                </div>

        <div className=" flex items-center justify-center p-6 pt-8">
          <button
            className=" select-none rounded-lg  bg-black border-2 border-[#00FFA2]   py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
                                     Token Buy
          </button>
        </div>
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
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
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
                  type="number"
                  value={tokenInput}
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
                  value={tokenInput}
                  // Increased mt-3 to mt-5, py-2 to py-4 for more vertical padding, and px-4 to px-6 for more horizontal padding.
                  className="mt-5 py-3 block  w-2/3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-6"
                  placeholder="Enter token amount"
                />
                                </div>
        
                         <div className="flex items-center justify-center">

               
                                </div>

        <div className=" flex items-center justify-center p-6 pt-8">
          <button
            className=" select-none rounded-lg  bg-black border-2 border-[#00FFA2]   py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
                                     Token Transfer
          </button>
        </div>
      </div>
          <div className="border-2  flex flex-col gap-10 border-[#393939]  rounded-r rounded-b p-16">
            <div className="flex items-center justify-center">
              <div className='underline  font-extrabold  text-3xl bg-[#0E1F17] rounded-md w-fit px-6 inline-flex items-center justify-center py-8   text-white'>
                Token Sale      </div>
            </div>
            <div className=" flex justify-center items-center ">
              <div className="text-white font bold flex justify-center items-center">
                We Provide a platform where anyone buy comsats coin . Users can use Comsats Coin to buy anything in the campus. Don’ts: The system will not allow administrators to edit transaction.   </div>
            </div>
            <div className="bg-gray-900 p-16 rounded-lg w-96 mx-auto text-white">
              <div className="mb-16">

                {/* Increased mb-4 to mb-8 for more margin-bottom */}
                <label htmlFor="tokenAmount" className="block text-xl text-center">
                  Amount
                </label>
                <input
                  id="tokenAmount"
                  type="number"
                  value={tokenInput}
                  className="mt-5 py-4 block w-2/3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-6"
                  placeholder="Enter token amount"
                />
              </div>
              <div className="mb-16">

{/* Increased mb-4 to mb-8 for more margin-bottom */}
<label htmlFor="tokenAmount" className="block text-xl text-center">
  Amount
</label>
<input
  id="tokenAmount"
  type="number"
  value={tokenInput}
  className="mt-5 py-4 block w-2/3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-6"
  placeholder="Enter token amount"
/>
</div>

              <div className="flex justify-between items-center mb-8"> {/* Increased mb-4 to mb-8 */}
                <div>
                  <div className="text-sm font-medium">Sale Raised</div>
                  <div className="text-xl font-bold">{saleRaised}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Soft Caps</div>
                  <div className="text-xl font-bold">{softCap}</div>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="border-2 border-[#589B74] bg-[#0E1F17] rounded-md hover:bg-pink-600 text-white font-bold py-3 px-8 inline-flex items-center">
                  <span>BUY TOKEN</span>
                  <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    {/* SVG path remains the same */}
                  </svg>
                </button>
              </div>
            </div>





            <div className="text-white font bold flex justify-center items-center"></div>
            <div className="flex justify-center">

            </div>


          </div>
          <div className=" items-center flex text-center">
            <div>


              <p className=" text-xl text-white ">Withdraw ETH</p>


            </div>
          </div>
          <div className="mb-6 mt-6">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Send to Ethereum Address"
              className="border-2 text-lg  w-full bg-[#0E1F17] border-[#589B74] placeholder:text-white px-5 py-2 rounded-md p-2"
            />

            <div className="my-3 flex items-center gap-4">
              <div>
                <input
                  type="text"
                  value={ethValue}
                  placeholder="0 ETH..."
                  className="border-2 text-lg w-full bg-[#0E1F17] border-[#589B74] placeholder:text-white px-5 rounded-md p-2"
                />
              </div>
              <button className="btn py-2 btn-green flex justify-between items-center border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-4">
                <span
                  className="ls-2 text-white"
                // onClick={(e) => handleWithdraw(e)}
                >
                  half
                </span>
              </button>
              <button className="btn py-2 btn-green flex justify-between items-center border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-4">
                <span
                  className="ls-2 text-white"
                // onClick={(e) => handleWithdraw(e)}
                >
                  full
                </span>
              </button>
            </div>
            <div>
              <span>
                {usdValue !== null && ethValue !== ""
                  ? `$${(usdValue * parseFloat(ethValue)).toFixed(2)}`
                  : " "}
              </span>
            </div>
            <div className="flex flex-wrap ">
              <div>
                <button className="btn mt-4 py-3 btn-green flex w-fit justify-between items-center border-2 border-[#589B74] bg-[#0E1F17] rounded-md px-4">
                  <div className="flex justify-start items-center gap-3">
                    <span
                      className="ls-2 text-white  font-bold"
                    // onClick={(e) => handleWithdraw(e)}
                    >
                      WITHDRAW
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28.812"
                      height="23.957"
                      viewBox="0 0 28.812 23.957"
                    >
                      <path
                        id="path0"
                        d="M11.562,23.831a.856.856,0,0,0,.373-.373l.13-.244V17.971l.66-.038A17.11,17.11,0,0,0,28.712,2.8C28.967.628,28.751-.055,27.833,0c-.405.026-.572.139-.826.559-3.194,5.269-7.789,7.781-14.254,7.791h-.688V5.728c0-3.176-.028-3.29-.825-3.366-.482-.047-.415-.109-5.771,5.089C-.521,13.254-.1,12.786.09,13.511c.052.194,10.372,10.209,10.657,10.345a.807.807,0,0,0,.817-.022"
                        transform="translate(28.812 23.957) rotate(180)"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              </div>

              <div>
                <div className=" mx-9  mt-7 flex flex-col justify-center items-center">
                  <input
                    type="range"
                    value={speed}
                    min="0"
                    max="100"
                    step="1"
                    className="w-36 h-3 bg-gray-200 appearance-none rounded-full
                  [&::-webkit-slider-runnable-track]:rounded-full  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[26px] 
                  [&::-webkit-slider-thumb]:w-[26px] [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-[#589B74]
                  "
                  />
                  <div className="flex justify-evenly mt-2 gap-6">
                    <label
                      className={`ml-2 ${speed <= 50 ? "text-green-500" : ""}`}
                    >
                      Slow
                    </label>
                    <label
                      className={`mr-2 ${speed > 50 ? "text-green-500" : ""}`}
                    >
                      Fast
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
