import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

import { ethers } from "ethers";
import { Alert } from "antd";
import "../../assets/css/global.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ImLink } from "react-icons/im";
import QRCode from "react-qr-code";
import { LoginContext } from "../../components/ContextProvider";

const Deposit = () => {
  const { address, fetchInitialData } = useContext(LoginContext);

  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importedWalletInfo, setImportedWalletInfo] = useState(null);

  const [walletAddress, setWalletAddress] = useState("");
  // const get = location.state?.recoveredSeedPhrase;
  const { loginData } = useContext(LoginContext);
  const [userInput, setUserInput] = useState("");
  // State for the imported wallet's address
  const [importedAddress, setImportedAddress] = useState("");
  //  const [seedPhrase, setSeedPhrase] = useState(''); // state variable for the seed phrase
  const [seedPhrase, setSeedPhrase] = useState(""); // state variable for the seed phrase
  const [seedPhraseOrPrivateKey, setSeedPhraseOrPrivateKey] = useState("");
  console.log(walletAddress);



  const handleInputChange = (event) => {
    setSeedPhraseOrPrivateKey(event.target.value);
  };

  const importWallet = () => {
    try {
      const wallet = ethers.Wallet.fromMnemonic(seedPhraseOrPrivateKey);
      const address = wallet.address;
      setImportedWalletInfo(address);
    } catch (error) {
      console.error("Error importing the wallet:", error);
      // Inform the user about the error (e.g., show a notification or message)
    }
  };

  // click to copy text ///////////
  function CopyToClipboardText({ textToCopy }) {
    const [isCopy, setIsCopy] = useState("");
    const handleCopyClick = () => {
      // Create a temporary text area element
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      setIsCopy(textArea.value);
      // Append the text area to the document
      document.body.appendChild(textArea);

      // Select the text in the text area
      textArea.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the temporary text area from the document
      document.body.removeChild(textArea);
      // Show a toast notification

      console.log("copy");
      setTimeout(() => {
        setIsCopy(false);
      }, 1500);
    };

    return (
      <p
        className="m-1 max-[484px]:text-[8px] max-[450px]:text-[5px] cursor-pointer text-sm md:text-base lg:text-lg xl:text-xl hover:border-b-2 whitespace-normal md:whitespace-nowrap"
        onClick={handleCopyClick}
      >
        {!isCopy && textToCopy}
        {isCopy && <p className="text-green-500">Copied successfully!</p>}
      </p>
    );
  }

  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({});
  const [body, setBody] = useState({});
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const arbBalance = useSelector((state) => state.balance.balance.arbBalance);
  const ethBalance = useSelector((state) => state.balance.balance.ethBalance);

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

  // useLayoutEffect(() => {
  //   fetchInitialData()
  // },[])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {alert.isAlert && (
        <Alert
          className="AlertBox"
          message={alert.message}
          banner
          type={alert.type}
          onClose
        />
      )}
      <div className="feature-card rounded-md">
        <div className="border-2 min-h-[150px] flex-wrap flex flex-col gap-4 border-[#393939] p-5 md:py-12 rounded-r rounded-b">
          <div className="flex justify-center font-bold">
            Use this  address to top up your balance
          </div>
          <div className="flex items-center max-[500px]:flex-col flex-wrap gap-16 justify-center mb-6">
            <div className="border-[6px] border-[#589B74] p-3">
              <div className="border-[4px] border-[#589B74] bg-white p-3">
                <QRCode
                  title="Mev"
                  value={address}
                  bgColor="white"
                  fgColor="150"
                  size="150"
                  includeMargin={false}
                  renderAs={"svg"}
                />
              </div>
            </div>

            {/* <div
              className="mt-6 text-center cursor-pointer"
              onClick={openModal}
            >
              <div className="flex justify-center">
                <BiPlus className="text-7xl hover:text-[#589B74]" />
              </div>

              <p className="mt-3 text-xl text-white mb-3">Import Wallet</p>
            </div> */}
          </div>
          <div className="felx justify-center text-center">
            It supports the major blockchain asset ETH
          </div>
          <div className="py-2 flex justify-center">
            <ImLink className="text-2xl" />
          </div>
          <div className="py-2 flex  flex-wrap justify-center">
            <div className="text-white w-auto  h-auto max-[525px]:w-full  py-3 gap-10 border-2 border-[#589B74] bg-[#0E1F17] ">
              <p className="">
                <CopyToClipboardText textToCopy={address} />
              </p>
            </div>
          </div>
          {isModalOpen && (
            <div
              className="inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fixed"
              id="modal"
            >
              <div className="bg-black opacity-0.5 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto my-8 border-[#393939] border-[3px] ">
                <div className="flex items-center justify-center text-2xl text-[#00FFA2]">
                  Import ETHEREUM Wallet
                </div>
                <div className="mt-5">
                  <h1 className="text-left text-white">
                    You can import your ETHEREUM wallet into the MEV Bot via a
                    Private Key or Mnemonic
                  </h1>
                  <p className="mt-4 text-left text-sm">
                    Imported Accounts were not created with the same Secret
                    Recovery Phrase as your MEV Bot wallet. For this reason,
                    these accounts will not appear automatically when you
                    restore your MEV Bot account with your Secret Recovery
                    Phrase
                  </p>
                </div>
                <div className="mt-8 text-left">
                  <p>Enter your Private Key or Mnemonic here:</p>
                  <input
                    type="text"
                    id="default-input"
                    className="bg-black border border-[#00FFA2] text-white text-sm rounded-lg block w-96 p-2.5"
                    value={importedWalletInfo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={closeModal}
                    className="bg-black border-2 border-[#589B74] text-white px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={importWallet}
                    className="bg-black border-2 border-[#589B74] text-white px-4  rounded-full mr-12"
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
          )}

          {importedWalletInfo && (
            <div>
              <p>Imported Address: {importedWalletInfo.address}</p>
            </div>
          )}

          <button onClick={() => fetchInitialData()} >Connect</button>
        </div>
      </div>
    </>
  );
};

export default Deposit;
