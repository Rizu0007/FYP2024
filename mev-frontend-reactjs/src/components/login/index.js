import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import arb from '../../assets/images/currency/Arbitrum.png'
import eth from '../../assets/images/eth.png'
import bin from '../../assets/images/currency/okkk.png'

import { LoginContext } from "../ContextProvider";

import Modal from "../model";
function Login() {


  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const history = useNavigate();

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

  const loginuser = async (e) => {
    e.preventDefault();

    const { fname, password } = inpval;

    if (fname === "") {
      toast.error("User name is required!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      // console.log("user login succesfully done");

      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        setTimeout(() => {
          history("/auth/Pinverf");
        }, 1000);
        setInpval({ ...inpval, fname: "", password: "" });
        toast.success("Login successfully!", {
          position: "top-center",
        });
      } else {
        // Login failed, show an error toast message
        toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
        });
        setInpval({ ...inpval, fname: "", password: "" });
      }
    }

  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
      />

      <div class="min-h-screen flex flex-col items-center justify-center  bg-black	">
       
       
        <div class="flex flex-col bg-black shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md border-4 border-[#00FFA2]">
      
        <div class="flex justify-center items-center mt-4 mb-4 space-x-0">
 
        <img src={bin} alt="Logo 3" class="h-10 w-10 mr-2" />
         <img src={eth} alt="Logo 1" class="h-10 w-7" />
  <img src={arb} alt="Logo 2" class="h-10 w-12" />
 
</div>

          <div class="font-medium self-center text-xl sm:text-2xl uppercase text-[#00FFA2]">
            Login To Your Account
          </div>

          <div class="relative mt-10 h-px bg-gray-300">
            <div class="absolute left-0 top-0 flex justify-center w-full -mt-2"></div>
          </div>
          <div class="mt-10">
            <form action="#">
              <div class="flex flex-col mb-6">
                <label
                  for="fname"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-white  "
                >
                  User Name:
                </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-800">
                    <svg
                      class="h-6 w-6 "
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
                    type="text"
                    value={inpval.fname}
                    onChange={setVal}
                    name="fname"
                    id="fname"
                    class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-[#00FFA2] w-full py-2 focus:outline-none focus:border-green-400 text-white  bg-black"
                    placeholder="User Name"
                  />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label
                  for="password"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-white "
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
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    onChange={setVal}
                    value={inpval.password}
                    name="password"
                    id="password"
                    type="password"
                    class="text-sm sm:text-base text-white placeholder-gray-500 pl-10 pr-4 rounded-lg bg-black border border-[#00FFA2] w-full py-2 focus:outline-none focus:border-green-400"
                    placeholder="Password"
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
                  onClick={loginuser}
                  class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base  bg-black  rounded py-2 w-full transition duration-150 ease-in  border-2 border-[#00FFA2]"
                >
                  <span class="mr-2 uppercase">Login</span>
                  <Modal isOpen={isModalOpen} closeModal={closeModal} />

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
              to="/auth/register"
              class="inline-flex items-center font-bold  text-xs text-center"
            >
              <span>
                <svg
                  class="h-6 w-6 "
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
              <span class="ml-2 text-[#00FFA2]">
                You don't have an account?
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
