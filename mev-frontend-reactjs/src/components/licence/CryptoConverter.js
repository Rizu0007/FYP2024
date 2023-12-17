import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
const CryptoConverter = ({ amount, selectedCrypto }) => {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const cryptoAddresses = {
    bitcoin: "bc1qr23d80jnhnzvyhqp8r3unsdafc8vl0crxlcdm2",
    ethereum: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1",
    litecoin: "ltc1qc73ym8f4f0vmj3c4e5kl209ag4wk2ssa9006xy",
    xrp: "rnWRFGiFb45WMtCvFgdzJ6LuBkQhRcxNab",
    eth: "Your Ethereum Address Here", // Replace with actual Ethereum address
    tee: "Your Tether Address Here", // Replace with actual Tether address
    bnb: "Your Binance Coin Address Here", // Replace with actual Binance Coin address
    lit: "Your Litecoin Address Here", // Replace with actual Litecoin address
    usd: "Your USD Coin Address Here", // Replace with actual USD Coin address
    dog: "Your Dogecoin Address Here", // Replace with actual Dogecoin address
    poly: "Your Polygon Address Here", // Replace with actual Polygon address
    trust: "Your TrueUSD Address Here", // Replace with actual TrueUSD address
    busd: "Your Binance USD Address Here", // Replace with actual Binance USD address
  };

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: "bitcoin,ethereum,tether,binancecoin,litecoin,usd-coin,dogecoin,polygon,trueusd,xrp,binance-usd",
          vs_currencies: "usd",
        },
      })
      .then((response) => {
        setCryptoPrices(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(cryptoPrices).length > 0 && selectedCrypto) {
      const price = cryptoPrices[selectedCrypto.toLowerCase()].usd;
      const converted = (amount / price).toFixed(6);
      setConvertedAmount(converted);
    }
  }, [amount, selectedCrypto, cryptoPrices]);

  return (
    <div>
      {error ? (
        <div>
          <p>Error fetching data: {error}</p>
        </div>
      ) : (
        <div>
          {convertedAmount} {selectedCrypto}
        </div>
      )}
    </div>
  );
};

export default CryptoConverter;
