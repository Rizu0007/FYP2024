import React, { useState, useEffect  , useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../ContextProvider";
const PinVerification = () => {
  const [pin, setPin] = useState("");
  const [local, setLocal] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(""); // Initialize verification status
  const navigate = useNavigate();
  // Removed useContext related to seedPhrase since it's no longer needed

  useEffect(() => {
    let token = localStorage.getItem("usersdatatoken");
    setLocal(token);
  }, []);

  const handlePinVerification = async () => {
    console.log("Verifying PIN..."); // To check if the function is triggered
    setVerificationStatus(""); // Reset verification status before starting the process
  
    try {
        console.log("Sending PIN for verification:", pin); // Check the pin being sent
        
        const response = await fetch("/verify-pin-code", { // Adjust the URL as per your server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${local}` // Adjust as per your token format
            },
            body: JSON.stringify({ pin })
        });
  
        const pinVerificationResponse = await response.json();
        console.log("Response received:", pinVerificationResponse); // Check the response received
  
        if (response.ok && pinVerificationResponse.status === 201) {
            navigate("/next-route"); // Navigate to the next page or handle success
        } else {
            setVerificationStatus(pinVerificationResponse.message || "PIN verification failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during PIN verification:", error);
        setVerificationStatus("An error occurred. Please try again.");
    }
  };
  



  return (
    <div>
      <div className="flex items-center justify-center md:p-28 p-4">
        <div className="bg-black border-4 text-center border-[#00FFA2] shadow-md w-fit rounded-xl bg-clip-border p-6">
          <h5 className="text-center font-bold text-3xl mb-2 text-[#00FFA2] underline text-blue-gray-900">
            MEV-BOT
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
          className={`bg-black border-2 py-3 px-2 border-[#00FFA2] text-white  focus:outline-none md:text-sm md:py-3 md:px-4 ${
            !pin || verificationStatus === "PIN code verified successfully"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handlePinVerification}
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
