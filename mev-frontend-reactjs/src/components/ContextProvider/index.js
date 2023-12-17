// LoginContext.js
import React, { createContext, useState } from 'react';

// Extend the context's default value to include network-related data
export const LoginContext = createContext({
  loginData: {
    user: null,
    seedPhrase: "",
    recoveredSeedPhrase: "",
  },
  setLoginData: () => {},
  setRecoveredSeedPhrase: () => {},
  network: 'eth', // Default network
  setNetwork: () => {} // Function to update network
});

const LoginDataProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({
    user: null,
    seedPhrase: "",
    recoveredSeedPhrase: "",
  });

  // New state for network selection
  const [network, setNetwork] = useState(localStorage.getItem('network') ?? 'eth');

  // This function updates only the recoveredSeedPhrase part of the state
  const setRecoveredSeedPhrase = (recoveredSeedPhrase) => {
    setLoginData(prevData => ({
      ...prevData,
      recoveredSeedPhrase,
    }));
  };

  // The context provider now passes down network and setNetwork as well
  return (
    <LoginContext.Provider value={{
      loginData,
      setLoginData,
      setRecoveredSeedPhrase,
      network, // Passing network state down through context
      setNetwork // Passing function to update network
    }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginDataProvider;
