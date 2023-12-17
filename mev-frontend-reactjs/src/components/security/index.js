import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Make sure to protect this route in the frontend and ensure that only authenticated users can access it
    const token = localStorage.getItem("token"); // Assuming the token is stored in local storage

    axios
      .get("YOUR_BACKEND_URL/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data", error);
      });
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {userData.fname}</p>
      <p>Email: {userData.email}</p>

      {/* Displaying the actual password and PIN is NOT recommended for security reasons. */}
      <p>Password: {userData.password}</p>
      <p>PIN: {userData.pin}</p>
    </div>
  );
}

export default UserProfile;
