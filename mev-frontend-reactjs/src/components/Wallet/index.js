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
            AIWeb3Labs MEV Bot
          </h5>

          <strong className="text-sm text-center flex justify-center font-bold  antialiased  leading-relaxed text-inherit">
            Professional Tool for MEV Attacks on Ethereum, Arbitrum and Binance
            Smart Chain Blockchain!
          </strong>
          <div>
            <div className="mt-5">
              <strong className="text-3xl text-center poppins flex justify-center font-bold  antialiased  leading-relaxed text-inherit">
                HIGHEST ROI- up to 20% per bot cycle*
              </strong>
              <strong className="text-md mt-2 text-center flex justify-center font-bold  antialiased  leading-relaxed text-inherit">
                Search analyze and select targets using neural network.
              </strong>
              <strong className="text-md mt-2 text-center flex justify-center font-bold  antialiased  leading-relaxed text-inherit">
                * Daily yield from MEV attacks is not a constant value and
                depends on the chosen strategy, the size of the starting
                capital, and the availability of liquidity on DEXes.
              </strong>
              {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-12 md:w-4/5 mx-auto">
                {bodyData.map((item, index) => (
                  <div className="flex justify-start items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 66 66"
                      className="mr-3 shape"
                    >
                      <g
                        id="Group_16220"
                        data-name="Group 16220"
                        transform="translate(-273 -522)"
                      >
                        <g
                          id="Rectangle_10716"
                          data-name="Rectangle 10716"
                          transform="translate(273 522)"
                          fill="#0e1f17"
                          stroke="#589b74"
                          strokeWidth="2"
                        >
                          <rect width="66" height="66" rx="6" stroke="none" />
                          <rect
                            x="1"
                            y="1"
                            width="64"
                            height="64"
                            rx="5"
                            fill="none"
                          />
                        </g>
                        <path
                          id="Subtração_8"
                          data-name="Subtração 8"
                          d="M15.988,31.976h0l-3.587-2.6-4.407.465-1.8-4.052-4.05-1.8.465-4.406L0,15.988,2.6,12.4,2.136,7.994l4.052-1.8,1.8-4.05,4.406.465L15.988,0l3.587,2.6,4.407-.465,1.8,4.052,4.05,1.8L29.37,12.4l2.6,3.588-2.6,3.591.465,4.407-4.052,1.8-1.8,4.05L19.58,29.37l-3.588,2.6ZM9.951,15.838a.514.514,0,0,0-.365.151L8.117,17.446a.517.517,0,0,0,0,.732l4.392,4.4a.518.518,0,0,0,.732,0L23.484,12.335a.518.518,0,0,0,0-.731l-1.462-1.47a.517.517,0,0,0-.732,0l-8.413,8.411-2.56-2.559a.513.513,0,0,0-.369-.148Z"
                          transform="translate(290.324 539.323)"
                          fill="#fff"
                        />
                      </g>
                    </svg>

                    <p className="text-white text-xl">{item}</p>
                  </div>
                ))}
              </div> */}
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
        <div className="flex items-center justify-center text-bold mb-4 ">
          Need help ? contact{" "}
          <span className="text-bold ml-2 text-xl underline">
            {" "}
            <Link> MEV BOT support</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
