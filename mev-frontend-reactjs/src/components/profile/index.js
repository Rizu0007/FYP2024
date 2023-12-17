import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../ContextProvider";
import { useNavigate, NavLink } from "react-router-dom";
import PinInput from "react-pin-input";

export default function Profile() {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [loading, setLoading] = useState(true); // Add loading state
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();

    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log("user verified");
      setLoginData(data);
      setLoading(false); // Data is available, set loading to false
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log("use logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };
  return (
    <div className="  bg-black flex justify-center items-center text-center">
      <div className="w-1/3 mx-auto rounded-xl shadow-2xl overflow-hidden">
        <div class="bg-black underline  text-[#589B74] text-center font-bold text-2xl">
          Change Pin Code
        </div>
        <div>
          <p className="mt-6 font-bold flex  item-center justify-center">
            Current Pin Code:{logindata ? logindata.pin : ""}
          </p>
        </div>
        <div>
          <p className="mt-2 font-sans flex text-center item-center justify-center">
            Create a new pin code ( 0-9 ).
          </p>
        </div>
        <div>
          <p className="mt-2 font-sans">
            {" "}
            The old pin code will cease to be valid after the new pin code is
            created
          </p>
        </div>

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
                     
      
                  />
                </div>

                <div className="flex items-center justify-center mt-4">
                <button
                className="z-10 px-5 py-2 border-2 border-[#589B74] text-white hover:bg-[#589B74]  transition-all bg-black"
              >
               Save
              </button>
                </div>

        <div class="bg-black  underline mt-7 text-[#589B74] justify-center text-center font-bold text-2xl">
          Change Password
        </div>

        <div>
        <div className="mt-5"> 
          <p className="mt-2 font-sans flex text-center item-center justify-center">
            Create a new Password ( min-6 ).
          </p>
        </div>
          <p className="mt-2 font-sans  text-center">
            {" "}
            The old Password will cease to be valid after the new Password is
            created
          </p>
        </div>
        <div className="w-full ">
          <div>
            <label className="block m-3">New Password:</label>
            <div
              className="inline-flex items-center
            "
            >
              <span>
                <svg
                  className="h-6 w-6 "
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
              <input
                className="text-sm sm:text-base bg-black placeholder-gray-500 pl-10 pr-4 rounded-lg text-white  w-full py-2 focus:outline-none border-2 border-[#00FFA2]"
                type="password"
              />
            </div>
          </div>
          <div>
            <label className="block m-3">Confrim Password:</label>
            <div
              className="inline-flex items-center
            "
            >
              <span>
                <svg
                  className="h-6 w-6 "
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
              <input
                className="text-sm sm:text-base bg-black placeholder-gray-500 pl-10 pr-4 rounded-lg text-white  w-full py-2 focus:outline-none border-2 border-[#00FFA2]"
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-7 mr-4 ">
                <button
                className="z-10 px-5 py-2 border-2 border-[#589B74] text-white hover:bg-[#589B74]  transition-all bg-black"
              >
               Save
              </button>
                </div>
        </div>
      </div>
    </div>
  );
}
