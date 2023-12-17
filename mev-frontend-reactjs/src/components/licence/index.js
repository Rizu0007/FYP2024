import React, { useEffect, useState } from "react";
import bit from "../../assets/images/SM/bitcoin-btc-logo.png";
import eth from "../../assets/images/SM/ethereum-eth-logo.png";
import tee from "../../assets/images/SM/tether-usdt-logo.png";
import bnb from "../../assets/images/SM/bnb-bnb-logo.png";
import lit from "../../assets/images/SM/litecoin-ltc-logo.png";
import usd from "../../assets/images/SM/usd-coin-usdc-logo.png";
import dog from "../../assets/images/SM/dogecoin-doge-logo-alternative.png";
import poly from "../../assets/images/SM/polygon-matic-logo.png";
import trust from "../../assets/images/SM/trueusd-tusd-logo.png";
import xrp from "../../assets/images/SM/xrp-xrp-logo.png";
import busd from "../../assets/images/SM/binance-usd-busd-logo.png";
import QRCode from "react-qr-code";
import axios from "axios";
import CryptoConverter from "./CryptoConverter";

const LicenseSelection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // new state for tracking selected image
  const imageData = [
    {
      id: "bit",
      name: "Bitcoin",
      src: bit,
      userID: "21633381",
      amount: "50 USD",
      address: "14qEZZFer9BeJritzJzHbEtpCtLVffV2Vc", // Replace with actual Bitcoin address
    },
    {
      id: "eth",
      name: "Ethereum",
      src: eth,
      userID: "21633381",
      amount: "50 USD",
      address: "14qEZZFer9BeJritzJzHbEtpCtLVffV2Vc", // Replace with actual Ethereum address
    },
    {
      id: "tee",
      name: "Tether",
      src: tee,
      userID: "21633381",
      amount: "50 USD",
      address: "14qEZZFer9BeJritzJzHbEtpCtLVffV2Vc", // Replace with actual Tether address
    },
    {
      id: "bnb",
      name: "Binance Coin",
      src: bnb,
      userID: "21633381",
      amount: "50 USD",
      address: "14qEZZFer9BeJritzJzHbEtpCtLVffV2Vc", // Replace with actual Binance Coin address
    },
    {
      id: "lit",
      name: "Litecoin",
      src: lit,
      userID: "21633381",
      amount: "50 USD",
      address: "14qEZZFer9BeJritzJzHbEtpCtLVffV2Vc", // Replace with actual Litecoin address
    },
    {
      id: "usd",
      name: "USD Coin",
      src: usd,
      userID: "21633381",
      amount: "50 USD",
      address: "14qEZZFer9BeJritzJzHbEtpCtLVffV2Vc", // Replace with actual USD Coin address
    },
    {
      id: "dog",
      name: "Dogecoin",
      src: dog,
      userID: "21633381",
      amount: "50 USD",
      address: "14qEZZFer9BeJritzJzHbEtpCtLVffV2Vc", // Replace with actual Dogecoin address
    },
    {
      id: "poly",
      name: "Polygon",
      src: poly,
      userID: "21633381",
      amount: "50 USD",
      address: "Your Polygon Address Here", // Replace with actual Polygon address
    },
    {
      id: "trust",
      name: "TrueUSD",
      src: trust,
      userID: "21633381",
      amount: "50 USD",
      address: "Your TrueUSD Address Here", // Replace with actual TrueUSD address
    },
    {
      id: "xrp",
      name: "XRP",
      src: xrp,
      userID: "21633381",
      amount: "50 USD",
      address: "Your XRP Address Here", // Replace with actual XRP address
    },
    {
      id: "busd",
      name: "Binance USD",
      src: busd,
      userID: "21633381",
      amount: "50 USD",
      address: "Your Binance USD Address Here", // Replace with actual Binance USD address
    },
  ];

  const plans = [
    {
      name: "Start",
      price: 399,
      features: [
        "Capital Limit ~10000$",
        "3-5% profit per Cycle",
        "min start balance: 0.1 ETH",
        "12% Bot Fee",
        "Standard Support",
      ],
      modalContent:
        "This license allows beginners to get acquainted with the bot. Test it and start earning. The maximum capital that the bot will operate with, regardless of the chosen strategy, is limited to $5000. Maximum profit from 50% to 150% per month.",
    },
    {
      name: "Pro",
      price: 999,
      features: [
        "Capital Limit ~10000$",
        "3-10% profit per Cycle",
        "min start balance: 0.1 ETH",
        "7% Bot Fee",
        "24/7 Priority Support",
      ],
      modalContent:
        "Private discord channel for clients. 24/7 premium tech support Maximum profit from 90% to 350% per month. Select the cryptocurrency of payment",
    },
    {
      name: "Max",
      price: 1999,
      features: [
        "Capital Limit no limits",
        "7-20% profit per Cycle",
        "min start balance: 0.1 ETH",
        "02% Bot Fee",
        "24/7 Premium Support",
      ],
      modalContent:
        "No limits on the maximum capital. The choice of those who have been trading and investing in cryptocurrencies for a long time and understand how things work here. Private discord channel for clients. 24/7 premium tech support. Maximum profit from 90% to 350% per month.",
    },
  ];

  const openModal = (plan) => {
    setSelectedPlanDetails(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  /////////////////
  return (
    <div className="  bg-black min-h-screen p-8 flex justify-center items-center">
      <div className="max-w-3xl mx-auto rounded-xl shadow-2xl overflow-hidden">
        <div class="bg-black text-white p-6 border-b-4 border-[#589B74] text-center font-bold text-2xl">
          Select License
        </div>
        {/* Render each plan */}
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-black text-[#EFEFEF] p-6 border-b border-[#3A444F]"
          >
            <h1 className="text-2xl font-bold text-[#589B74] mb-4">
              {plan.name} ${plan.price} <span className="text-base">/Year</span>
            </h1>
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className=" z-10 flex justify-center">
              <button
                onClick={() => openModal(plan)}
                className="z-10 px-5 py-2 border-2 border-[#589B74] text-white hover:bg-[#589B74]  transition-all bg-black"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPlanDetails && (
        <div
          className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fixed"
          id="modal"
        >
          <div
            className="bg-black opacity-0.5 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto my-8 border-[#393939] border-[3px] overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* Your modal content here */}
            <div className="text-center">
              <h1 className="text-xl font-bold">
                {selectedPlanDetails.name} Plan - ${selectedPlanDetails.price}{" "}
                p/year
              </h1>
              <p className="mt-4 text-left">
                {selectedPlanDetails.modalContent}
              </p>
            </div>
            <div className="mt-8 text-center">
              <p>Select the cryptocurrency of payment</p>
              <div className="flex mt-4 -ml-6 gap-3">
                {imageData.map((data) => (
                  <img
                    key={data.id}
                    src={data.src}
                    alt={data.name}
                    className="w-8 cursor-pointer"
                    onClick={() => handleImageClick(data)}
                  />
                ))}

                {/* Info box for selected image */}

                {/*  */}
              </div>
            </div>
            <div className="mt-8 text-center">
              {selectedImage && (
                <div class="bg-black p-6 rounded-xl border-2 border-[#589B74] shadow-lg max-w-lg mx-auto my-8">
                  <div class="flex justify-start items-center">
                    <div class="p-3 bg-white rounded-lg shadow">
                      <QRCode
                        // value={`crypto:${cryptoAddresses[currency]}?amount=${convertedAmounts[currency]}`}

                        value={selectedImage.name}
                        size={100}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="M"
                      />
                    </div>

                    <div class="ml-6">
                      <p class="text-sm text-gray-400 ">
                        User ID:{" "}
                        <strong className="font-bold tex-xl">21633381</strong>{" "}
                      </p>
                      <div class="mt-2">
                        <p class="text-xl -ml-4 text-white font-bold-500 ">
                          Send
                          <CryptoConverter
                            amount={selectedPlanDetails.price}
                            selectedCrypto={selectedImage.name}
                          />
                        </p>
                        <p class="text-sm text-gray-400 mt-1">
                          ( in one payment ) to:
                        </p>
                        <p class=" rounded-lg shadow-inne text-sm text-white font-medium tracking-wide -ml-4 my-4 bg-black">
                          14gEZZFer9BeJritzJzHEbtCptLvfFV2Vc
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 p-4 bg-gray-700 rounded-lg shadow-inner">
                    <p class="text-xs text-gray-300 text-center">
                      If you send any other BTC amount, the payment system will
                      ignore it!
                    </p>
                  </div>

                  <div class="mt-6 flex items-center justify-start">
                    <div class="rounded-full h-5 w-4 bg-[#589B74] mr-3 animate-pulse"></div>

                    <p class="text-sm text-gray-300">Awaiting Payment...</p>
                  </div>
                </div>
              )}

              <h1 className="text-sm mt-9 ">If you have already paid</h1>
              <button className="bg-black border-2 mt-2 border-[#589B74] text-white px-4 py-2 rounded-full">
                Activate your license
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="bg-black text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseSelection;
