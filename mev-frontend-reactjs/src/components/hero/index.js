import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/eth.png";
import arblogo from "../../assets/images/arb.png";
import Rain from "../rain";
import { FaEthereum, FaTimes, FaBars } from "react-icons/fa";

import "../../assets/css/global.css";
import { useDispatch, useSelector } from "react-redux";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation(); // Access the current route

  // Check if the route is "/bot"
  const isBotRoute = location.pathname === "/Bcreate";

  const [_isConnected, setIsConnected] = useState(false);

  const [network, setNetwork] = useState(
    localStorage.getItem("network") ?? "eth"
  );
 
  const [showPopUp, setShowPopUp] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  // const navigator = useNavigate();
  const items = [
    {
      key: "1",
      label: <Link to={"/"}>Home</Link>,
    },
    {
      key: "2",
      label: (
        <Link
          target="_blank"
          to={"https://app.gitbook.com/s/crOtyWgVQIVIdbrLBJMw"}
        >
          Documentation
        </Link>
      ),
    },
    {
      key: "3",
      label: _isConnected ? (
        <Link to={"/"}>Disconnect Wallet</Link>
      ) : (
        <button style={{ color: "white" }}>
          Connect Wallet
        </button>
      ),
    },
    {
      key: "1",
      label: <Link to={"/"}>Profile</Link>,
    },
  ];

  const handlePopUp = () => {
    setShowPopUp(false);
  };

  const showPopUpModal = () => {
    setShowPopUp(true);
  };

  
  return (
    <>
      <div className="container mx-auto px-5 py-7 bg-black md:px-10 flex items-center justify-between">
        {/* Left Menu */}
        <div className="flex max-[650px]:hidden items-center space-x-2 text-3xl font-bold">
          <a href="#" className="text-sm md:text-2xl text-white">
            {" "}
            <NavLink target="_blank" to={"https://www.docs.aiweb3labs.com/"}>
              Documentation
            </NavLink>
          </a>
        </div>

        {/* Logo */}
        <div className="  text-xl text-white font-bold md:mx-4 flex ">
          <img src={logo} alt="logo" className="mr-3 md:w-auto w-[20px]" />
          {/* <p className="md:mt-4">MEV BOT</p> */}
        </div>

        {/* Right Menu */}
        <div className="flex items-center py-1   ">
          {!isBotRoute ? (
            <div className="flex items-center">
              <Link
                to="#"
                className="max-[650px]:hidden text-sm md:text-base text-white"
              >
                <div className="relative mt-2 md:w-8 md:h-8 w-5 overflow-hidden bg-black  dark:bg-black">
                <img
            
              src="https://img.icons8.com/ultraviolet/40/000000/launched-rocket.png"
              alt="launched-rocket"
              className="inline-block mt-2 mr-2 animate-bounce"
              width="30" // Adjusted width
              height="30" // Adjusted height to maintain aspect ratio
            />{" "}
                </div>
              </Link>
              <Link
                to="/Bcreate"
                className=" max-[650px]:hidden font-bold text-2xl md:text-xl  text-white px-2 py-2 rounded-md"
              >
                Launch Bot
              </Link>
            </div>
          ) : (
            ""
          )}
          <div className="hidden max-[650px]:block pr-4">
            <button onClick={toggleMenu}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>
      {/* Responsive Menu */}
      {isOpen && (
        <div className="min-[650px]:hidden transition-all ">
          <div className="px-2 pt-2 flex justify-evenly  items-centerpb-3 space-y-1 sm:px-3">
            <a href="#" className="text-base text-xl font-semibold flex items-center text-white">
              {" "}
              <NavLink target="_blank" to={"https://www.docs.aiweb3labs.com/"}>
                Documentation
              </NavLink>
            </a>

            <div href="#" className=" flex items-center">
              <Link to="#" className="text-sm md:text-base text-white">
                <div className="relative   md:w-10 md:h-10 w-7 overflow-hidden bg-black  dark:bg-black">
                <img
              src="https://img.icons8.com/ultraviolet/40/000000/launched-rocket.png"
              alt="launched-rocket"
              className="inline-block  animate-bounce"
              width="30" // Adjusted width
              height="30" // Adjusted height to maintain aspect ratio
            />{" "}
                </div>
              </Link>
              <Link
                to="/Bcreate"
                className="  font-bold text-xl md:text-xl   text-white px-2 py-2 rounded-md"
              >
                Launch Bot
              </Link>
            </div>
          </div>
        </div>
      )}
      <div div className="h-[200px] w-full relative ">
        <h1 className="text-center text-[#00FFA2] uppercase md:text-[65px] max-[918px]:w-full text-[36px] spacing font-bold bg-transparent absolute poppins left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] lh-1">
          AI WEB3 LAB Mev Bot
        </h1>

        <Rain />
        {/* create custom matrix digital rain */}
      </div>
    </>
  );
};

export default Hero;
