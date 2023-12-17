const axios = require("axios");

const getBalance = async (address) => {
  const alchemyAPIKey = "ID2oPRYC8ymBe9imgOuFyoqWMBpV8KM5";
  const url = `https://eth-mainnet.alchemyapi.io/v2/${alchemyAPIKey}`;
  const response = await axios.post(url, {
    jsonrpc: "2.0",
    method: "eth_getBalance",
    params: [address, "latest"],
    id: 1,
  });

  const balance = parseInt(response.data.result, 16);
  return balance;
};

module.exports = {
  getBalance,
};
