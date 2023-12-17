import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import arb from '../../assets/images/currency/Arbitrum.png'
import eth from '../../assets/images/eth.png'
import PinInput from "react-pin-input";
import bin from '../../assets/images/currency/okkk.png'
import React, { useState, useContext } from 'react';

import { LoginContext } from "../ContextProvider";
function Register() {
  const [isCopied, setIsCopied] = useState(false);
  const [newSeedPhrase, setNewSeedPhrase] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    pin: "",
    confirmPin: "",
  });
  const navigate = useNavigate();
  const { setLoginData } = useContext(LoginContext);

  console.log(newSeedPhrase);
  const generateWallet = () => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  };

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    try {
      let seedPhrase = ethers.Wallet.createRandom().mnemonic.phrase;
      const { fname, email, password, cpassword, pin, confirmPin } = inpval;

      const validationErrors = [];

      if (fname === "") {
        validationErrors.push("First name is required");
      }
      if (email === "") {
        validationErrors.push("Email is required");
      } else if (!email.includes("@")) {
        validationErrors.push("Email must include '@'");
      }
      if (password === "") {
        validationErrors.push("Password is required");
      } else if (password.length < 6) {
        validationErrors.push("Password must be at least 6 characters long");
      }
      if (cpassword === "") {
        validationErrors.push("Confirm Password is required");
      } else if (cpassword.length < 6) {
        validationErrors.push(
          "Confirm Password must be at least 6 characters long"
        );
      }
      if (password !== cpassword) {
        validationErrors.push("Password and Confirm Password do not match");
      }
      if (pin === "") {
        validationErrors.push("PIN is required");
      }
      if (confirmPin === "") {
        validationErrors.push("Confirm PIN is required");
      }
      if (pin !== confirmPin) {
        validationErrors.push("PIN and Confirm PIN do not match");
      }

      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
          toast.error(error, { position: "top-center" });
        });
      } else {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            email,
            password,
            cpassword,
            pin,
            confirmPin,
            seedPhrase,
          }),
        });

        if (response.status === 201) {
          localStorage.setItem(
            "usersdatatoken",
            (await response.json()).result.token
          );
          setLoginData((prevData) => ({
            ...prevData,
            user: {
              // ... user details you want to store ...
            },
            seedPhrase: seedPhrase,
            // ... any other data you want to include ...
          }));
          navigate("/seedcreate");
          toast.success("Registration Successfully done 😃!", {
            position: "top-center",
          });
          setInpval({
            fname: "",
            email: "",
            password: "",
            cpassword: "",
            pin: "",
            confirmPin: "",
          });
        } else {
          // Handle other HTTP status codes or errors
          const errorMessage = "An error occurred during registration.";
          toast.error(errorMessage, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred during registration.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
      />

      <div class="min-h-screen flex flex-col items-center justify-center  bg-black">
        <div class="flex flex-col bg-black shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md border-4 border-[#00FFA2]">
        <div class="flex justify-center items-center mt-4 mb-4 space-x-0">
 
 <img src={bin} alt="Logo 3" class="h-10 w-10 mr-2" />
  <img src={eth} alt="Logo 1" class="h-10 w-7" />
<img src={arb} alt="Logo 2" class="h-10 w-12" />

</div>
          <div class="font-medium self-center text-xl sm:text-2xl uppercase text-[#00FFA2]">
            Register An Account
          </div>
          <div className="flex space-x-4 mb-4"></div>
          <div class="relative mt-10 h-px bg-gray-300">
            <div class="absolute left-0 top-0 flex justify-center w-full -mt-2"></div>
          </div>
          <div class="mt-10">
            <form action="#">
              <div class="flex flex-col mb-6">
                <label
                  for="name"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                >
                  User Name
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input
                    id="fname"
                    name="fname"
                    onChange={setVal}
                    value={inpval.fname}
                    type="text"
                    class=" bg-black text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg  w-full py-2 focus:outline-none text-white border-2 border-[#00FFA2]"
                    placeholder="User Name"
                  />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label
                  for="email"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                >
                  Email:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-white">
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={setVal}
                    value={inpval.email}
                    class=" text-white text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border-2 border-[#00FFA2] w-full py-2 focus:outline-none bg-black  "
                    placeholder="E-Mail Address"
                  />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label
                  for="password"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                >
                  Password:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    type="password"
                    value={inpval.password}
                    onChange={setVal}
                    name="password"
                    id="password"
                    class="text-sm sm:text-base bg-black placeholder-gray-500 pl-10 pr-4 rounded-lg text-white  w-full py-2 focus:outline-none border-2 border-[#00FFA2]"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label
                  for="confirm_password"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-white"
                >
                  Confirm Password:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    type="password"
                    value={inpval.cpassword}
                    onChange={setVal}
                    name="cpassword"
                    id="cpassword"
                    class="  text-sm sm:text-base text-white bg-black placeholder-gray-500 pl-10 pr-4 rounded-lg border  w-full py-2 focus:outline-noneborder-2 border-[#00FFA2]"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="text-white mb-4">
                PIN
                <div className="flex items-center justify-center">
                  <PinInput
                    length={6}
                    initialValue=""
                    secret
                    secretDelay={800}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "10px" }}
                    inputStyle={{
                      borderColor: "#00FFA2",
                      background: "black",
                      color: "white",
                    }}
                    inputFocusStyle={{ borderColor: "#00FFA2" }}
                    autoSelect={true}
                    regexCriteria={/^\d*$/}
                    mask={null}
                    placeholder=""
                    onChange={(value) =>
                      setInpval((prev) => ({ ...prev, pin: value }))
                    }
                  />
                </div>
              </div>
              <div className="text-white mb-4">
                Confirm PIN
                <div className="flex items-center justify-center">
                  <PinInput
                    length={6}
                    initialValue=""
                    secret
                    secretDelay={800}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "10px" }}
                    inputStyle={{
                      borderColor: "#00FFA2",
                      background: "black",
                      color: "white",
                    }}
                    inputFocusStyle={{ borderColor: "#00FFA2" }}
                    autoSelect={true}
                    regexCriteria={/^\d*$/}
                    mask={null}
                    placeholder=""
                    onChange={(value) =>
                      setInpval((prev) => ({ ...prev, confirmPin: value }))
                    }
                  />
                </div>
              </div>

              <div class="flex items-center mb-6 -mt-4">
                <div class="flex ml-auto">
                  <Link
                    href="#"
                    class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                  ></Link>
                </div>
              </div>
              <div class="flex w-full">
                <button
                  type="submit"
                  onClick={addUserdata}
                  class="flex items-center justify-center text-white focus:outline-none  text-sm sm:text-base bg-black  rounded py-2 w-full transition duration-150 ease-in border-2 border-[#00FFA2]"
                >
                  <span class="mr-2 uppercase">Register</span>
                  <span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div class="flex justify-center items-center mt-6">
            <Link
              to="/auth/login"
              class="inline-flex items-center font-bold   text-xs text-center"
            >
              <span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span class="ml-2 text-gren-500">Already have a account</span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default Register;
 