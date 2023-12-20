import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Rain from "../rain";
// import { Dropdown } from "antd";
import SettingsModal from "../settingsModal";
import { useEffect } from "react";
import logo from "../../assets/images/eth.png";

import { FaHome, FaLock } from "react-icons/fa";
import { API } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { storeBalance } from "../../redux/balanceRedux";
import { FaEthereum, FaTimes, FaBars } from "react-icons/fa";
import arb from "../../assets/images/svg/arb.svg";
import bin from "../../assets/images/currency/okkk.png";
import Web3 from "web3";
import { LoginContext } from "../ContextProvider";
import { BigNumber, ethers } from "ethers";
import withdraw from "../../pages/ComsatCoin/index";

const BotHero = () => {

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
  //   buyProduct,
  // } = useStateContext();

  const { tokenBalance, balance, address } = useContext(LoginContext);

  // let token = BigInt(tokenBalance) / 1000000000000000000n;
  // let tokenBal = Number(token)

  // nav toggle

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [ethBalance, setETHBalance] = useState("");

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [showNetwork, setShowNetwork] = useState(false);
  const { network, setNetwork } = useContext(LoginContext);

  const [selectedNetworkName, setSelectedNetworkName] = useState("ETHEREUM");
  const [arbBalance, setArbBalance] = useState("");

  const [openNav, setOpenNav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDollar, setIsDollar] = useState(true);
  const [value, setValue] = useState(0);
  const [bnbBalance, setBNBBalance] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const { loginData } = useContext(LoginContext);
  const [isDataSaving, setIsDataSaving] = useState(false);

 

  const openNetworkForm = () => {
    setShowNetwork(true);
  };

  const closeNetworkForm = () => {
    setShowNetwork(false);
  };

 

 

 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  // Function to save wallet data to the backend
  const saveWalletData = async () => {
    setIsDataSaving(true);
    try {
      const walletData = {
        address: walletAddress,
        ethBalance,
        bnbBalance,
        arbBalance,
      };

      const response = await fetch('/saveWalletData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(walletData),
      });

      if (response.ok) {
        console.log('Wallet data saved successfully');
      } else {
        console.error('Failed to save wallet data');
      }
    } catch (error) {
      console.error('Error saving wallet data:', error);
    } finally {
      setIsDataSaving(false);
    }
  };



  useEffect(() => {
    if (walletAddress && ethBalance && bnbBalance && arbBalance) {
      saveWalletData();
    }
  }, [ethBalance, bnbBalance, arbBalance, walletAddress]);

  // ... your component's JSX with balance displays ...

  return (
    <>
      <nav className=" py-7 bg-black flex justify-around items-center space-x-4">
        {/* Left Options */}
        <div className="px-11">
          <div className="text-center flex justify-end items-center ">
            <div className="flex justify-end items-center gap-4">
              <div className="md:bg-[#242424] flex rounded items-center">
                <div className="icon-holder p-3 px-4 md:bg-[#0E1F17] border-2 border-[#589B74] rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27.818"
                    height="22.977"
                    viewBox="0 0 27.818 22.977"
                    className="mobile-icon"
                  >
                    <path
                      id="path0"
                      d="M2.945,34.66A4.026,4.026,0,0,0-.128,37.616c-.16.626-.16,16.322,0,16.949a4.041,4.041,0,0,0,2.775,2.881l.407.127H24.285l.407-.127a4.041,4.041,0,0,0,2.775-2.881,10.463,10.463,0,0,0,.1-2.457V50.053H23.59c-4.8,0-4.848-.008-5.948-.84a3.965,3.965,0,0,1,.777-6.714c.774-.373.732-.37,5.171-.371h3.977V40.073a10.47,10.47,0,0,0-.1-2.457,4.07,4.07,0,0,0-2.747-2.881l-.38-.128L13.8,34.6c-8.594-.008-10.592,0-10.858.063m16.7,9.048a2.433,2.433,0,0,0-.635,4.55c.538.262.76.276,4.8.276h3.759V43.647l-3.814.006c-2.1,0-3.949.028-4.11.055m1.884,1.73a.745.745,0,0,1,0,1.3,2.181,2.181,0,0,1-2.107-.285.741.741,0,0,1,.285-1.019,3.5,3.5,0,0,1,1.82,0"
                      transform="translate(0.248 -34.596)"
                      fill="#fff"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <button
                  className="text-white px-4 py-2 rounded-md md:block hidden"
                  onClick={tokenBalance}
                >
                  <span className="text-xl font-bold">
                    {/* {tokenBal} */}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Centered Logo */}
        <div className="text-center flex justify-center items-center">
          <img src={logo} alt="logo" className="mr-3" />
          <h1 className="text-white text-2xl font-bold uppercase logo">
            {/* Mev Bot */}
          </h1>
        </div>

        {/* Right Options */}
        <div className="px-11 max-[825px]:hidden">
          <div className="flex items-center space-x-4">
            {selectedNetworkName && (
              <Link className="flex items-center font-bold text-xl  ">
                {" "}
                <div className=" w-fit">
                  {selectedNetworkName === "Arbitrum" ? (
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxNiAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDQuOTk1OTVWMTMuMDA0MUMwIDEzLjMzMjIgMC4xNzYyODUgMTMuNjM1NyAwLjQ2Mjg5OCAxMy44MDA5TDcuNTMwODYgMTcuODc0N0M3LjgyMDgyIDE4LjA0MTggOC4xNzkxOSAxOC4wNDE4IDguNDY5MTQgMTcuODc0N0wxNS41MzcxIDEzLjgwMDlDMTUuODIzNyAxMy42MzU3IDE2IDEzLjMzMjIgMTYgMTMuMDA0MVY0Ljk5NTk1QzE2IDQuNjY3NzUgMTUuODIzNyA0LjM2NDI5IDE1LjUzNzEgNC4xOTkxTDguNDY5MTQgMC4xMjUzNDFDOC4xNzkxOSAtMC4wNDE3ODA3IDcuODIwODEgLTAuMDQxNzgwMiA3LjUzMDg2IDAuMTI1MzQyTDAuNDYyODk4IDQuMTk5MUMwLjE3NjI4NCA0LjM2NDI5IDAgNC42Njc3NSAwIDQuOTk1OTVaTTcuNzY0OTEgMS4yMjA0NEwxLjMxODMgNC45NDcxOUMxLjE3NTI5IDUuMDI5ODcgMS4wODczOCA1LjE4MTQzIDEuMDg3MzggNS4zNDUzMlYxMS40NjIxTDQuNDM5OTMgNS45NzYxQzQuNzIxMjkgNS41MTU3IDUuMjI1NDYgNS4yMzQzOCA1Ljc2OTIzIDUuMjM0MzhINy42ODkzMkwyLjQxNTEgMTMuNjg2OUwyLjk4NzkyIDE0LjAxOEw4LjM4ODM1IDUuMjM0MzhIMTEuMDI5MUw1LjEwODk4IDE1LjI0NDJMNy43NjQ5MSAxNi43Nzk2QzcuOTEwMTUgMTYuODYzNSA4LjA4OTg1IDE2Ljg2MzUgOC4yMzUwOSAxNi43Nzk2TDEwLjU5MTcgMTUuNDE3Mkw4LjA3NzY3IDExLjYxMjlMOS41NTM0IDkuMDc2ODRMMTIuODMxNiAxNC4xMjI0TDEzLjQxNzQgMTMuNzgzN0wxMC4wOTcxIDguMzA4MzVMMTEuMzM5OCA2LjA3OTcyTDE0LjkxMjYgMTEuMjc4M1Y1LjM0NTMyQzE0LjkxMjYgNS4xODE0MyAxNC44MjQ3IDUuMDI5ODcgMTQuNjgxNyA0Ljk0NzE5TDguMjM1MSAxLjIyMDQ0QzguMDg5ODUgMS4xMzY0NyA3LjkxMDE1IDEuMTM2NDcgNy43NjQ5MSAxLjIyMDQ0WiIgZmlsbD0iIzQ0RjFBNiIvPgo8L3N2Zz4K"
                      alt="arb"
                      className="w-6"
                    />
                  ) : selectedNetworkName === "Binance" ? (
                    <img src={bin} alt="opt" className="w-12 ml-2" />
                  ) : (
                    <FaEthereum className="text-green-500" size={"26px"} />
                  )}
                </div>
              </Link>
            )}
            <div className="flex ">
              <button
                className="icon-holder ml-auto start-4 p-2 px-3 md:bg-[#0E1F17] border-2 border-[#589B74] rounded"
              >
                {" "}
                {address}              </button>


            </div>
            {/* <Link   to='/profile' className="icon-holder p-3 px-4 md:bg-[#0E1F17] border-2 border-[#589B74] rounded">
      <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                  </Link> */}
            {/* <Link
              className="icon-holder p-2 px-3 md:bg-black border-2 border-[#589B74] rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 28.612 28.607"
              >
                <path
                  id="settings"
                  d="M27.933,11.047l-2.2-.478a11.966,11.966,0,0,0-.708-1.706l1.219-1.894A.855.855,0,0,0,26.132,5.9L22.7,2.478a.855.855,0,0,0-1.067-.114L19.744,3.58a11.967,11.967,0,0,0-1.7-.705l-.479-2.2A.855.855,0,0,0,16.726,0H11.884a.855.855,0,0,0-.835.673l-.48,2.2a11.966,11.966,0,0,0-1.706.708L6.97,2.366a.855.855,0,0,0-1.064.116L2.478,5.908a.855.855,0,0,0-.114,1.064L3.58,8.866a11.966,11.966,0,0,0-.706,1.7l-2.2.478A.855.855,0,0,0,0,11.884v4.842a.855.855,0,0,0,.673.835l2.2.478a11.966,11.966,0,0,0,.708,1.706L2.364,21.639a.855.855,0,0,0,.114,1.067l3.43,3.427a.855.855,0,0,0,1.064.114l1.894-1.216a11.965,11.965,0,0,0,1.706.708l.478,2.2a.855.855,0,0,0,.835.67h4.842a.855.855,0,0,0,.835-.673l.478-2.2a11.967,11.967,0,0,0,1.706-.708l1.894,1.216a.855.855,0,0,0,1.067-.114L26.133,22.7a.855.855,0,0,0,.116-1.067l-1.216-1.894a11.966,11.966,0,0,0,.708-1.706l2.2-.478a.855.855,0,0,0,.673-.835V11.884a.855.855,0,0,0-.674-.835Zm-8.5,3.257A5.129,5.129,0,1,1,14.3,9.174,5.129,5.129,0,0,1,19.432,14.3Zm0,0"
                  fill="#fff"
                />
              </svg>
            </Link> */}
            {/* Modal start */}

            <Link
              to="/auth/Pinverf"
              className="icon-holder ml-auto start-4 p-3 px-4 md:bg-[#0E1F17] border-2 border-[#589B74] rounded"
            >
              <FaLock className="text-2xl" />
            </Link>
          </div>
        </div>
        <div className="hidden max-[825px]:block pr-4">
          <button onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="min-[825px]:hidden transition-all ">
          <div className="px-2 pt-2 flex justify-evenly  items-centerpb-3 space-y-1 sm:px-3">
            <div className="px-11 min-[825px]:hidden">
              <div className="flex  flex-wrap  items-center space-x-4">
                {selectedNetworkName && (
                  <Link className="flex items-center font-bold text-xl  ">
                    {" "}
                    <div className=" w-[100px]"></div>
                  </Link>
                )}
                <div className="flex ">
                  <button
                    onClick={openNetworkForm}
                    className="icon-holder ml-auto p-3 px-4 md:bg-[#0E1F17] border-2 border-[#589B74] rounded"
                  >
                    {address}
                  </button>


                </div>
                {/* <Link   to='/profile' className="icon-holder p-3 px-4 md:bg-[#0E1F17] border-2 border-[#589B74] rounded">
      <svg class="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                  </Link> */}
                {/* <Link
                  className="icon-holder p-2 px-3 bg-black border-2 border-[#589B74] rounded"
                  onClick={openModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 28.612 28.607"
                  >
                    <path
                      id="settings"
                      d="M27.933,11.047l-2.2-.478a11.966,11.966,0,0,0-.708-1.706l1.219-1.894A.855.855,0,0,0,26.132,5.9L22.7,2.478a.855.855,0,0,0-1.067-.114L19.744,3.58a11.967,11.967,0,0,0-1.7-.705l-.479-2.2A.855.855,0,0,0,16.726,0H11.884a.855.855,0,0,0-.835.673l-.48,2.2a11.966,11.966,0,0,0-1.706.708L6.97,2.366a.855.855,0,0,0-1.064.116L2.478,5.908a.855.855,0,0,0-.114,1.064L3.58,8.866a11.966,11.966,0,0,0-.706,1.7l-2.2.478A.855.855,0,0,0,0,11.884v4.842a.855.855,0,0,0,.673.835l2.2.478a11.966,11.966,0,0,0,.708,1.706L2.364,21.639a.855.855,0,0,0,.114,1.067l3.43,3.427a.855.855,0,0,0,1.064.114l1.894-1.216a11.965,11.965,0,0,0,1.706.708l.478,2.2a.855.855,0,0,0,.835.67h4.842a.855.855,0,0,0,.835-.673l.478-2.2a11.967,11.967,0,0,0,1.706-.708l1.894,1.216a.855.855,0,0,0,1.067-.114L26.133,22.7a.855.855,0,0,0,.116-1.067l-1.216-1.894a11.966,11.966,0,0,0,.708-1.706l2.2-.478a.855.855,0,0,0,.673-.835V11.884a.855.855,0,0,0-.674-.835Zm-8.5,3.257A5.129,5.129,0,1,1,14.3,9.174,5.129,5.129,0,0,1,19.432,14.3Zm0,0"
                      fill="#fff"
                    />
                  </svg>
                </Link> */}

                <Link
                  to="/auth/Pinverf"
                  className="icon-holder ml-auto start-4 p-3 px-4 md:bg-[#0E1F17] border-2 border-[#589B74] rounded"
                >
                  <FaLock className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-[200px] w-full relative">
        <h1 className="text-center text-[#00FFA2] uppercase md:text-[65px] text-[50px] spacing font-bold bg-transparent absolute poppins left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] lh-1">
Comsats Coin        </h1>

        <Rain />
        {/* create custom matrix digital rain */}
      </div>
      {/* matrix */}

      {/* settings popup */}
    </>
  );
};

export default BotHero;
