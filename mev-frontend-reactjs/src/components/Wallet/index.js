import React, { useState } from "react";
import { ethers } from "ethers";
import { Link, useNavigate } from "react-router-dom";

function CreateWallet() {
  const bodyData = [
    "2 HIGHEST ROT- up to 20%  per bot  cycle ",
    " Search analyze and select targets using neural network.",
    "  Daily yield from MEV attacks is not a constant value and depends on the chosen strategy, ",
    "The size of the stocking capital, and the availability of liquidity.",
  ];
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  // function generateWallet() {
  //   const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
  //   setNewSeedPhrase(mnemonic);
  //   console.log(mnemonic)
  //   navigate('/register', { state: { seedPhrase: mnemonic } });
  // }
  return (
    <div className="flex items-center justify-center md-screen md:mt-0 mt-6 md:p-28">
      <div className="bg-black sh700adow-md w-2/4 h-30 rounded-xl bg-clip-border border-4 border-[#00FFA2]">
        <div className="p-6">
          <h5 className=" flex items-center justify-center font-bold text-3xl mb-2 font-sans  antialiased underline  text-[#00FFA2] leading-snug tracking-normal text-blue-gray-900">
            Comsats Coin
          </h5>

          <strong className="text-sm text-center flex justify-center font-bold  antialiased  leading-relaxed text-inherit">
            COMSATS Coins represent a fundamental change that bridges the gap between
            international financial trends.
          </strong>
          <div>
            <div className="mt-5">
              <strong className="text-3xl text-center poppins flex justify-center font-bold  antialiased  leading-relaxed text-inherit">
                Use Comsats Coin for your daily life as a currency in the Campus.
              </strong>

              <strong className="text-md mt-2 text-center flex justify-center font-bold  antialiased  leading-relaxed text-inherit">
                The "COMSATS Coins" initiative emerges as a light of financial innovation inside
                the COMSATS Universities ecosystem in a world that is experiencing fast technological change.
              </strong>
            </div>
          </div>
          <div
            class="flex items-center justify-center p-3 space-y-0.5	 mb-4 text-sm text-red-800 rounded-lg  dark:text-red-400 "
            role="alert"
          ></div>
          <div
            class="flex items-center justify-center p-3 space-y-0.5	 mb text-sm text-red-800 rounded-lg  dark:text-red-400 "
            role="alert"
          >
            <div></div>
          </div>
        </div>
        <div className=" flex items-center -mt-7 justify-center p-6 pt-0">
          <button
            className="relative select-none rounded-lg bg-black border-2 border-[#00FFA2] py-3 px-3 text-center align-middle font-sans font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={() => navigate("/auth/login")}
          >
            Start
            <img
              src="https://img.icons8.com/ultraviolet/40/000000/launched-rocket.png"
              alt="launched-rocket"
              className="inline-block  animate-bounce"
              width="30" // Adjusted width
              height="30" // Adjusted height to maintain aspect ratio
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
