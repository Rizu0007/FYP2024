import React from "react";
import Rain from "../rain";
import logo from "../../assets/images/eth.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="bg-black-900 p-6 flex justify-evenly items-center">

        <div className="text-center flex justify-center items-center">
          <img src={logo} alt="logo" className="mr-3" />
          <h1 className="text-white text-2xl font-bold uppercase logo"></h1>
        </div>

        <div class="flex items-center">
          <a href="/profile" class="text-white ml-4"></a>
        </div>
      </div>
      <div div className="h-[200px] w-full relative">
        <h1 className="text-center text-[#00FFA2] uppercase md:text-[65px] text-[50px] spacing font-bold bg-transparent absolute poppins left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] lh-1">
          Comsats Coin
        </h1>

        <Rain />
      </div>
    </>
  );
}

export default Header;
