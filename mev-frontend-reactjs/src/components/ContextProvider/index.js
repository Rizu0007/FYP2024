// LoginContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

// --internal imports
import {
  CheckIfWalletConnected,
  ConnectWallet,
  connectingTokenContract,
  connectingTokenSaleContract,
  getBalance,
} from '../Utils/index';

// Extend the context's default value to include network-related data
export const LoginContext = createContext({
  loginData: {
    user: null,
    seedPhrase: "",
    recoveredSeedPhrase: "",
  },
  setLoginData: () => { },
  setRecoveredSeedPhrase: () => { },
  network: 'eth', // Default network
  setNetwork: () => { } // Function to update network
});

const LoginDataProvider = ({ children }) => {

  // -- STATE VARIABLES
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('');
  const [nativeToken, setNativeToken] = useState('')
  const [tokenHolders, setTokenHolders] = useState([]);
  const [tokenSale, setTokenSale] = useState('')
  const [currentHolder, setCurrentHolder] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0)


  const [loginData, setLoginData] = useState({
    user: null,
    seedPhrase: "",
    recoveredSeedPhrase: "",
  });

  // New state for network selection

  // This function updates only the recoveredSeedPhrase part of the state
  const setRecoveredSeedPhrase = (recoveredSeedPhrase) => {
    setLoginData(prevData => ({
      ...prevData,
      recoveredSeedPhrase,
    }));
  };


  // --FETCH CONTRACT Data
  const fetchInitialData = async () => {
    try {
      //GET USER ACCOUNT
      const account = await CheckIfWalletConnected();
      console.log(account)
      //GET USER BALANCE
      const balance = await getBalance();
      setBalance(ethers.utils.formatEther(balance.toString()));
      setAddress(account);


      //--TOKEN CONTRACT
      const TOKEN_CONTRACT = await connectingTokenContract();

      if (account) {
        let tokenBal = await TOKEN_CONTRACT.balanceOf(account)
        setTokenBalance(String(tokenBal))
      } else {
        setTokenBalance(0)
      }
      // -- GET ALL TOKEN DATA
      const tokenName = await TOKEN_CONTRACT.name();
      const tokenSymbol = await TOKEN_CONTRACT.symbol();
      const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
      const tokenStandard = await TOKEN_CONTRACT.standard();
      const tokenHolders = await TOKEN_CONTRACT._userId();
      const tokenOwner = await TOKEN_CONTRACT.owner();
      const tokenAddress = await TOKEN_CONTRACT.address;

      const nativeToken = {
        tokenAddress: tokenAddress,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        tokenOwner: tokenOwner,
        tokenStandard: tokenStandard,
        tokenTotalSupply: ethers.utils.formatEther(String(tokenTotalSupply)),
        tokenBalance: tokenBalance,
        tokenHolders: Number(tokenHolders)
      }

      setNativeToken(nativeToken);

      // --GETTING HOLDERS DATA
      const getTokenHolder = await TOKEN_CONTRACT.getTokenHolder();
      setTokenHolders(getTokenHolder);

      //--GETTING TOKEN HOLDER DATA
      if (account) {
        const getTokenHolderData = await TOKEN_CONTRACT.getTokenHolderData(account);

        const currentHolder = {
          tokenId: Number(getTokenHolderData[0]),
          from: getTokenHolderData[1],
          to: getTokenHolderData[2],
          totalToken: ethers.utils.formatEther(String(getTokenHolderData[3])),
          tokenHolder: getTokenHolderData[4]
        }

        setCurrentHolder(currentHolder);
      }

      //---TOKEN SALE CONTRACT
      const TOKEN_SALE_CONTRACT = await connectingTokenSaleContract();
      const tokenPrice = await TOKEN_SALE_CONTRACT.tokenPrice()
      const tokenSold = await TOKEN_SALE_CONTRACT.tokenSold()
      const tokenSaleBalance = await TOKEN_CONTRACT.balanceOf("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

      const tokenSale = {
        tokenPrice: ethers.utils.formatEther(String(tokenPrice)),
        tokenSold: Number(tokenSold),
        tokenSaleBalance: ethers.utils.formatEther(String(tokenSaleBalance))
      }

      setTokenSale(tokenSale);

      console.log(nativeToken)
      console.log(tokenSale)

    } catch (error) {
      console.log(error)
    }
  }


  // useEffect(() => {
  //   fetchInitialData()
  // }, [])

  const buyToken = async (nToken) => {
    try {
      // const amount = ethers.utils.parseUnits(nToken.toString(), "ether")
      const tokenInString = String(nToken)
      const amount = ethers.utils.parseUnits(tokenInString, "ether")
      const contract = await connectingTokenSaleContract();

      const buying = await contract.buyToken(nToken, {
        value: amount.toString(),
        gasLimit: 3000000
      })

      await buying.wait()
      console.log(buying)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const mintToken = async () => {

    const TOKEN_AMOUNT = 1000;
    const tokens = TOKEN_AMOUNT.toString();
    const transferAmount = ethers.utils.parseEther(tokens);
    const contract = await connectingTokenContract();

    const minting = await contract.mint(transferAmount);
    await minting.wait();
    window.location.reload();

  }

  //NATIVE TOKEN TRANSFER
  const transferNativeToken = async () => {
    try {

      const TOKEN_SALE_CONTRACT = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
      const TOKEN_AMOUNT = 1000;
      const tokens = TOKEN_AMOUNT.toString();
      const transferAmount = ethers.utils.parseEther(tokens);

      const contract = await connectingTokenContract();
      const transaction = await contract.transfer(
        TOKEN_SALE_CONTRACT,
        transferAmount
      );
      await transaction.wait();
      console.log(transaction);
      window.location.reload()

    } catch (error) {
      console.log(error)
    }
  }


  const transferToken = async (address, nToken) => {
    try {
      const tokens = String(nToken);
      // const tokens = nToken.toString();
      const transferAmount = ethers.utils.parseEther(tokens);

      const contract = await connectingTokenContract();
      const transaction = await contract.transfer(
        address,
        transferAmount
      );
      await transaction.wait();
      console.log(transaction);
      window.location.reload()

    } catch (error) {
      console.log(error)
    }
  }



  const buyProduct = async (nToken) => {
    try {
      const tokens = String(nToken);
      const transferAmount = ethers.utils.parseEther(tokens);

      const contract = await connectingTokenContract();
      const transaction = await contract.buyToken(
        transferAmount
      );
      await transaction.wait();
      console.log(transaction);
      window.location.reload()

    } catch (error) {
      console.log(error)
    }
  }


  // The context provider now passes down network and setNetwork as well
  return (
    <LoginContext.Provider value={{
      loginData,
      setLoginData,
      
      

      transferNativeToken,
      currentHolder,
      tokenSale,
      tokenHolders,
      nativeToken,
      balance,
      address,
      tokenBalance,
      buyToken,
      ConnectWallet,
      setAddress,
      mintToken,
      transferToken,
      buyProduct,
      fetchInitialData
    }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginDataProvider;
