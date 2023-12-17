import React, { useEffect, useState , useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { storeToken } from "../../storage/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../ContextProvider";

const Create = () => {
  const location = useLocation();
  const initialSeedPhrase = location.state?.seedPhrase;
  const [isCopied, setIsCopied] = useState(false);
  const [newSeedPhrase, setNewSeedPhrase] = useState(initialSeedPhrase);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [local, setlocal] = useState();

  console.log(initialSeedPhrase);
const { loginData } = useContext(LoginContext);

  useEffect(() => {
    let token = localStorage.getItem("usersdatatoken");
    setlocal(token);
    console.log(token);
  }, []);

  const copyToClipboard = () => {
    if (newSeedPhrase) {
      const textArea = document.createElement("textarea");
      textArea.value = newSeedPhrase;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      toast.success("Text is copied!"); // This triggers the toast
    }
  };

  const handleNext = async () => {
    console.log(local);
    if (isSaveEnabled && newSeedPhrase) {
      // try {
      // const response = await axios.post('/store-seed-phrase', { newSeedPhrase } ,{headers:{authorization :local}});
      //   if (response.status === 201) {
      //     console.log('Seed phrase saved successfully');
      //     setIsCopied(true);
      //   } else {
      //     console.error('Unexpected response status:', response.status);
      //   }
      // } catch (error) {
      //   console.error('Error saving seed phrase:', error);
      // }
    } else {
    }
    navigate("/bot/deposit", { state: { newSeedPhrase } });
  };

  function setWalletAndMnemonic() {
    setNewSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }

  const handleSaveToggle = (event) => {
    setIsSaveEnabled(event.target.checked);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-black shadow-md w-full md:w-4/5 lg:w-4/5 rounded-xl bg-clip-border p-6 flex flex-col items-center">
        <div className="flex items-center justify-center py-5">
          <div className="bg-black">
            <img src="data:image/png;base64,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"></img>
          </div>
        </div>

        <div className="text-white font-bold px-4 py-3 rounded" role="alert">
          <span className="font-bold sm:flex  flex items-center justify-center md:justify-start">
            Backup Secret Recovery Phrase (Mnemonic)
          </span>
        </div>
        <p className="text-base font-light leading-relaxed text-inherit mt-4 text-left md:text-left">
          A new empty ETH MEV Bot wallet has been created for you.
        </p>

        <p className="text-left md:text-left">
          Access and control over the wallet is provided by a mnemonic phrase.
          You can restore this wallet in any EVM wallet (Metamask, Coinbase,
          Trustwallet).
          <br />
          If the mnemonic phrase is lost, the bot will not be able to restore
          your funds and wallet.
        </p>
        <div className="flex flex-wrap justify-between max-w-md py-5">
          {loginData.seedPhrase.split(" ").map((word, index) => (
            <div key={index} className="flex  items-center w-1/3">
              <span className="">{index + 1}.</span>
              <div className="bg--200  font-bold bg-black  rounded text-center">
                {word}
              </div>
            </div>
          ))}
        </div>
        <div className=" flex flex-col items-center">
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center h-8  rounded-md cursor-pointer  border-neutral-200/60 bg-black text-white   focus:outline-none  group"
          >
            <div className="">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6klEQVR4nO2Zv0/CQBTHuxxadABRIIQiCQw00FU3jZsuDGzij41ER5XojIAymJg09ycYjf4LmogxxkUHBxL+m2feSQuNmmDba2m84TtwkNf3ebx3vX4rEUIgyJL8ToAIAOJ/FYloIWKvConFMGy1FGg/qaD3SkD7mm3pvRKLU20qLC73IdZWI3DxXnSUNP1FGLe0EuEHkMiGuSVPDYi3IsQzMh8AbBueydOBqqcKHwDsVS8AWl3VHYBoXIaanjU/Ox3Yvww2cQowl5Sh8VBgAY01L5KnAzkG2O1kvgULFEDnVQ02AP0hmADoi38ARAtRMcSa2IXENkrFjUwTd2JJHCX64jAH4jRKxHFaEw801MsnskC5EvpIslPTIbaGfo0XAM1HF3yhs+dhsrHUl9WHBqwXAJuNtHOAw+ucGXCpHGNr6B574Y0uKC54oxv7STMowhjr6B7jRXglX3LLncYqXH4M52BtJ25+h+4xGrA4E268H2h1VdY241R+bABU5SRludAohN+SxvlReDYE9bu8pWJHN3lYLsdgPi2bu9PEApCByVu/tUK4qdqI+80FACXPhKBynLLMhBtq3BeYhc8dwBAO2fpeEg6ucuw+YXeAz19U2G4rEE3YS942wCRJ8jsBIgCI/1Uk/7mFPgExwJyNFuhpwAAAAABJRU5ErkJggg==" />
            </div>{" "}
          </button>
          <p className="text-base font-light leading-relaxed text-inherit mt-4 text-center">
            Write down this 12-word Secret Recovery Phrase and save it in a
            place that you trust and only you can access.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <label className="relative inline-flex items-center cursor-pointer text-center">
            <input
              type="checkbox"
              checked={isSaveEnabled}
              onChange={handleSaveToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Save
            </span>
            <span className="gap-x-2">
              I've saved the Secret Recovery Phrase
            </span>
          </label>
        </div>
        <div className=" mt-6 w-full flex justify-end">
          <button
            onClick={handleNext}
            className={`bg-black border-2 border-[#00FFA2] text-white py-2 px-4 rounded focus:outline-none ${
              !isSaveEnabled && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isSaveEnabled}
          >
            Next
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Create;
