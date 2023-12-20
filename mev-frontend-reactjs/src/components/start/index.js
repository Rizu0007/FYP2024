import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/global.css";

import BotActivity from "../bot-activity";
import { LoginContext } from "../ContextProvider";
import { ethers } from "ethers";
import axios from 'axios';

// import { useStateContext } from '../Context/index';


const Start = () => {

  // const {
  //   transferNativeToken,
  //   currentHolder,
  //   tokenSale,
  //   tokenHolders,
  //   nativeToken,
  //   balance,
  //   tokenBalance,
  //   address,
  //   buyToken,
  //   ConnectWallet,
  //   setAddress,
  //   mintToken,
  //   transferToken,
  // } = useStateContext();

  const { transferNativeToken, mintToken  } = useContext(LoginContext)


  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { network } = useContext(LoginContext);






  const [isDollar, setIsDollar] = useState(true);
  const [value, setValue] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const { loginData } = useContext(LoginContext);





  const generateWalletAddress = async (seedPhrase) => {
    try {
      const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
      const address = wallet.address;
      setWalletAddress(address);

      // Persist the address in local storage
      localStorage.setItem("walletAddress", address);
    } catch (error) {
      console.error("Error generating wallet address:", error);
    }
  };

  // Function to load wallet address from local storage
  const loadWalletAddress = () => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) setWalletAddress(savedAddress);
  };

  // useEffect hook to generate or load the wallet address when component mounts
  useEffect(() => {
    // Load the wallet address from local storage if it exists
    loadWalletAddress();

    // Otherwise, generate a new wallet address if seed phrases are available
    if (!walletAddress) {
      if (loginData.seedPhrase) {
        generateWalletAddress(loginData.seedPhrase);
      } else if (loginData.recoveredSeedPhrase) {
        generateWalletAddress(loginData.recoveredSeedPhrase);
      }
    }
  }, [loginData.seedPhrase, loginData.recoveredSeedPhrase]);



  const toggleCurrency = () => {
    setIsDollar((prevIsDollar) => !prevIsDollar);
    // Perform currency conversion here, and update the 'value' state accordingly.
    // In this example, we'll simply toggle between dollars and Ethereum.
    if (isDollar) {
      setValue(0.05); // Example conversion rate: 1 dollar = 0.05 Ethereum
    } else {
      setValue(0); // Reset to dollars
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    image: '',
    description: '',
    size: '',
    location: '',
    price: '',
    categoryMess: '',  // new field for Category Mess
  categoryEshop: '', 
  });


  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProductData({ ...productData, image: e.target.files[0] });
    } else {


      setProductData({ ...productData, [e.target.name]: e.target.value });
    };
  };
  const handleChangeSize = (e) => {
    setProductData({ ...productData, size: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      if (key === 'image') {
        formData.append(key, productData[key], productData[key].name);
      } else {
        formData.append(key, productData[key]);
      }
    }
    try {
      const response = await fetch('/products', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("Response data: ", data); // Debugging

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setShowModal(false);
    } catch (error) {
      console.error('Error posting data', error);
    }
  };


  return (
    <>

      <div className="feature-card rounded-md">
        <div className="border-2 min-h-[150px] flex flex-col gap-4 border-[#393939] p-5 rounded-r rounded-b">
          <div className='border-4 border-[#589B74] bg-[#0E1F17] rounded-md    w-fit px-6 inline-flex items-center justify-center p-8 text-base font-medium text-white-500'>Mint New Token to Contract


          </div>
          <div className="text-white font bold flex justify-center items-center">
            Minting a new token is like creating fresh money in the digital world. It's the process where a certain amount of a new cryptocurrency is generated and put into circulation     </div>
          <div className="flex justify-center">
            <Link
              href="#"
              className="border-2 border-[#589B74] bg-[#0E1F17] rounded-md   w-[300px] px-4 inline-flex items-center justify-center p-4 text-base font-medium text-white-500   "
            >
              <button
                onClick={() => mintToken()}
                class="h-medium text-xl"
              >
                Mint {" "}
              </button>


              <div className="relative w-9  h-8 overflow-hidden   ">
                <img
                  src="https://img.icons8.com/ultraviolet/40/000000/launched-rocket.png"
                  alt="launched-rocket"
                  className="inline-block mt-2 animate-bounce"
                  width="30" // Adjusted width
                  height="30" // Adjusted height to maintain aspect ratio
                />{" "}
              </div>

            </Link>
          </div>
          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-2/3 h-5 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </div>
          <div className='border-4 border-[#589B74] bg-[#0E1F17] rounded-md    w-fit px-4 inline-flex items-center justify-center p-8 text-base font-medium text-white-500'> Transfer Token To Contract To Buy


          </div>
          <div className="text-white font bold flex justify-center items-center">
            This contract allows you to transfer your tokens to it. When you want to make a purchase, you send a transaction to the contract, and it uses your tokens to complete the transaction, enabling you to buy products or services in a secure and automated way..

          </div>
          

          <div className="text-white font bold flex justify-center items-center"></div>
          <div className="flex justify-center">
            <Link
              href="#"
              className="border-2 border-[#589B74] bg-[#0E1F17] rounded-md   w-[300px] px-4 inline-flex items-center justify-center p-4 text-base font-medium text-white-500   "
            >
              <button
                onClick={() => transferNativeToken()}
                class="h-medium text-xl"
              >
                Transfer
              </button>


              <div className="relative w-9  h-8 overflow-hidden   ">
                <img
                  src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/64/external-transfer-due-diligence-icongeek26-outline-colour-icongeek26"
                  alt="launched-rocket"
                  className="inline-block mt-2 animate-bounce"
                  width="30" // Adjusted width
                  height="30" // Adjusted height to maintain aspect ratio
                />{" "}
              </div>

            </Link>
          </div>

          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-2/3 h-5 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            
            <Link
              href="#"
              className="border-2 border-[#589B74] bg-[#0E1F17] rounded-md   w-[300px] px-4 inline-flex items-center justify-center p-4 text-base font-medium text-white-500   "
            >
              <button
                class="h-medium text-xl"
                onClick={() => setShowModal(true)}

              >
                Add Proudct
              </button>


              <div className="relative w-9  h-8 overflow-hidden   ">
                <img
                  src="https://img.icons8.com/color/48/product--v1.png"
                  alt="launched-rocket"
                  className="inline-block mt-2 animate-bounce"
                  width="30" // Adjusted width
                  height="30" // Adjusted height to maintain aspect ratio
                />{" "}
              </div>

            </Link>
          </div>
        </div>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative w-2/3 my-6 mx-auto max-w-2xl border-4 border-[#00FFA2]">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid  rounded-t ">
                    <h3 className="text-3xl font=semibold">General Info</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="bg-black shadow-md rounded px-8  pb-8 w-full max-w-2xl">
           

      {/* New Category E-shop field */}
      <div class="flex flex-col">
        <label for="selectedCategory" class="mb-1 text-xs sm:text-sm tracking-wide text-white">
          Select Category
        </label>
        <select
          id="selectedCategory"
          name="selectedCategory"
          class="bg-black text-white border-2 border-[#00FFA2] text-sm sm:text-base pl-10 pr-4 rounded-lg w-full py-4 focus:outline-none"
          value={productData.selectedCategory}
          onChange={handleChange}
        >
          <option value="">Choose a Category</option>
          <option value="mess">Category Mess-1</option>
          <option value="eshop">Category E-Shop</option>
        </select>
      </div>

                      <div class="flex flex-col ">
                        <label
                          for="name"
                          class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                        >
                          Product Name
                        </label>
                        <div class="relative">
                          <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">

                          </div>
                          <input
                            id="fname"
                            name="name"
                            type="text"
                            class=" bg-black text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full py-4 focus:outline-none text-white border-2 border-[#00FFA2]"
                            placeholder="Product Name"
                            onChange={handleChange}
                            value={productData.name}
                          />
                        </div>
                      </div>

                      <div class="flex flex-col ">
                        <label
                          for="name"
                          class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                        >
                          Product Description
                        </label>
                        <div class="relative">
                          <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">

                          </div>
                          <input
                            id="description"
                            name="description"
                            type="text"
                            class=" bg-black text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full py-4 focus:outline-none text-white border-2 border-[#00FFA2]"
                            placeholder="Product Description"
                            onChange={handleChange}
                            value={productData.description}
                          />
                        </div>
                      </div>
                      <div class="flex flex-col ">
                        <label
                          for="name"
                          class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                        >
                          Product Location
                        </label>
                        <div class="relative">
                          <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">

                          </div>
                          <input
                            id="Location"
                            name="location"
                            type="text"
                            class=" bg-black text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full py-4 focus:outline-none text-white border-2 border-[#00FFA2]"
                            placeholder="Product Location"
                            onChange={handleChange}
                            value={productData.location}
                          />
                        </div>
                      </div>
                      <div class="flex flex-col ">
                        <label
                          for="name"
                          class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                        >
                          Product Size
                        </label>
                        <div class="relative">
                          <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">

                          </div>
                          <select
                            id="size-select"
                            name="size"
                            onChange={handleChangeSize}
                            value={productData.size}

                            class=" bg-black text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full py-4 focus:outline-none text-white border-2 border-[#00FFA2]"
                          >
                            <option value="small">PizzA</option>
                            <option value="large">BURGER</option>
                            <option value="extraLarge">Samosa</option>
                            <option value="extraLarge">COKE</option>


                          </select>
                        </div>
                      </div>
                      <div class="flex flex-col ">
                        <label
                          for="name"
                          class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                        >
                          Product Price
                        </label>
                        <div class="relative">
                          <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">

                          </div>
                          <input
                            id="Price"
                            name="price"
                            type="text"
                            class=" bg-black text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full py-4 focus:outline-none text-white border-2 border-[#00FFA2]"
                            placeholder="Product Price"
                            onChange={handleChange}
                            value={productData.price}
                          />
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <label
                          for="name"
                          class="py-2 text-xs sm:text-sm tracking-wide text-white"
                        >
                          Product Image
                        </label>
                        <div class="relative">
                          <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">

                          </div>
                          <input
                            id="Image"
                            name="image"
                            type="file"
                            class=" bg-black text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full py-4 focus:outline-none "
                            placeholder="Product Image"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}


      </div>

    </>
  );
};

export default Start;
