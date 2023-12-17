import React, { useState } from "react";
import { FaEthereum, FaTimes } from "react-icons/fa";
import arb from "../../assets/images/svg/arb.svg";

const Hero = () => {
  const [showNetwork, setShowNetwork] = useState(false);
  const [network, setNetwork] = useState(localStorage.getItem("network") ?? "eth");
  const [selectedNetworkName, setSelectedNetworkName] = useState("Ethereum"); // Initialize with "Ethereum"

  const openNetworkForm = () => {
    setShowNetwork(true);
  };

  const closeNetworkForm = () => {
    setShowNetwork(false);
  };

  const changeToEthereum = async () => {
    setNetwork("eth");
    setSelectedNetworkName("Ethereum");
    // Your Ethereum network switching logic here
  };

  const changeToArbitrum = async () => {
    setNetwork("arb");
    setSelectedNetworkName("Arbitrum One");
    // Your Arbitrum network switching logic here
  };

  const networkSelector = (e) => {
    const selectedValue = e.target.value;
    setNetwork(selectedValue);
    setSelectedNetworkName(selectedValue === "eth" ? "Ethereum" : "Arbitrum One");
  };

  return (
    <div>
      <button onClick={openNetworkForm}>Open Network Form</button>

      {showNetwork && (
        <form
          className="popup bg-black border border-white p-10 w-[400px] max-w-full fixed top-[50%] left-[50%] z-[100] translate-x-[-50%] translate-y-[-50%] rounded-md"
        >
          <button className="absolute top-0 right-0 p-4" onClick={closeNetworkForm}>
            <FaTimes className="text-white" />
          </button>
          <div className="mt-4 text-white font-bold ls-2 mb-4">
            Change Network
          </div>
          <div className="flex mt-3 justify-between items-center">
            <label htmlFor="eth" className="flex items-center gap-3">
              <FaEthereum className="text-green-500" />
              <span className="text-green-500">
                <strong>Ethereum</strong>
              </span>
            </label>
            <input
              type="radio"
              value="eth"
              id="eth"
              name="network"
              onChange={networkSelector}
            />
          </div>
          <div className="flex mt-3 justify-between items-center">
            <label htmlFor="arb" className="flex items-center gap-3">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAx16. . ."
                alt="arb"
                className="min-w-[20px]"
              />
              <span className="text-green-500">
                <strong>Arbitrum One</strong>
              </span>
            </label>
            <input
              type="radio"
              value="arb"
              id="arb"
              name="network"
              onChange={networkSelector}
            />
          </div>
          <p>Selected Network: {selectedNetworkName}</p>
        </form>
      )}
    </div>
  );
};

export default Hero;
