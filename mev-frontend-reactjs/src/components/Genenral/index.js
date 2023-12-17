import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../ContextProvider';
import { useNavigate , NavLink } from "react-router-dom"
import PinInput from "react-pin-input";


export default function General() {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [loading, setLoading] = useState(true); // Add loading state
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const data = await res.json();

    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log("user verified");
      setLoginData(data);
      setLoading(false); // Data is available, set loading to false
    }
  }

  useEffect(() => {
    DashboardValid();
  }, []);

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
        console.log("use logout");
        localStorage.removeItem("usersdatatoken");
        setLoginData(false)
        history("/");
    } else {
        console.log("error");
    }
  }
  return (
    <div className="mt-20 my-32 bg-black flex justify-center items-center">
        
    <div class="bg-black    text-[#589B74] text-center font-bold text-2xl">
    UserName:
    <span className='text-white border-2 border-[#589B74]'> {logindata ? logindata.fname : ''}</span>
    </div>
    
              </div>

  

);

      }