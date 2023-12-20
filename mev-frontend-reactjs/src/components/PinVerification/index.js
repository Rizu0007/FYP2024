import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../ContextProvider";


const PinVerification = () => {
  const { fetchInitialData } = useContext(LoginContext);

  const [pin, setPin] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [local, setLocal] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(""); // Initialize verification status
  const navigate = useNavigate();
  const { setRecoveredSeedPhrase } = useContext(LoginContext);

  useEffect(() => {
    let token = localStorage.getItem("usersdatatoken");
    setLocal(token);
  }, []);

  useEffect(() => {
    fetchInitialData()
  },[])

  const handleRetrieveSeedPhrase = async () => {
    setVerificationStatus(""); // Reset verification status before starting the process

    try {
      const pinVerificationResponse = await axios.post(
        "/verify-pin-code",
        { pin },
        { headers: { authorization: local } }
      );

      if (pinVerificationResponse.status === 201) {
        const seedPhraseResponse = await axios.get("/retrieve-seed-phrase", {
          headers: { authorization: local },
        });

        if (seedPhraseResponse.status === 200) {
          const retrievedSeedPhrase = seedPhraseResponse.data.data.seedPhrase;
          setSeedPhrase(retrievedSeedPhrase);
          setRecoveredSeedPhrase(retrievedSeedPhrase);
          // Send the seedPhrase as a prop to walletHome and navigate
          navigate("/bot/deposit")


          // Set a success message in the verification status
          setVerificationStatus("PIN code verified successfully");
        } else {
          // Handle other unexpected statuses for seed phrase retrieval
          setVerificationStatus("Error retrieving seed phrase");
        }
      } else if (pinVerificationResponse.status === 401) {
        // The PIN was invalid
        setVerificationStatus("Invalid PIN code");
      } else {
        // Handle other unexpected statuses for PIN verification
        setVerificationStatus("Error verifying PIN code");
      }
    } catch (error) {
      // Handle network errors or any other unexpected issues
      setVerificationStatus("An error occurred. Please try again.");
    }

  };

  return (
    <div>
      <div className="flex items-center justify-center md:p-28 p-4">
        <div className="bg-black border-4 text-center border-[#00FFA2] shadow-md w-fit rounded-xl bg-clip-border p-6">
          <h5 className="text-center font-bold text-3xl mb-2 text-[#00FFA2] underline text-blue-gray-900">
            Comsats Coin
          </h5>

          <p className="text-base  font-light leading-relaxed text-inherit mt-4 py-5">
            Highly profitable algorithmic trades in automatic mode on
            decentralized exchanges <br></br>on ETHEREUM blockchain Keeping your
            anonymity and privacy
          </p>

          <div className="flex items-center justify-center text-bold text-xl">
            {" "}
            Enter Unlock Pin Code
          </div>
          <div className="flex items-center justify-center">
            <PinInput
              length={6}
              initialValue=""
              secret
              secretDelay={800}
              type="numeric"
              inputMode="number"
              style={{ padding: "10px", borderColor: "green" }}
              inputStyle={{ borderColor: "green" }}
              inputFocusStyle={{ borderColor: "green" }}
              onComplete={(value, index) => setPin(value)}
              autoSelect={true}
              regexCriteria={/^\d*$/}
              mask={null}
              placeholder=""
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className={`bg-black border-2 py-3 px-2 border-[#00FFA2] text-white  focus:outline-none md:text-sm md:py-3 md:px-4 ${!pin || verificationStatus === "PIN code verified successfully"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                }`}
              onClick={handleRetrieveSeedPhrase}
            >
              Unlock
            </button>
          </div>
          {/* Display verification status here */}
          {verificationStatus && (
            <div className="text-center text-red-500 mt-2">
              {verificationStatus}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PinVerification;
