const cron = require("node-cron");
const { ethers } = require("ethers");
const BotSessionModel = require("../../models/BotSession");
const UsersModel = require("../../models/UserModel");

// RPC URLs for different networks
const rpcURLs = {
  ethereum:
    "https://polygon-mumbai.g.alchemy.com/v2/LKuGzJkukJOtmaC_jRHSEoZHP3tdNy6V",
  arbitrum: "https://arbitrum.llamarpc.com",
  binanceChain: "https://bsc-testnet.publicnode.com",
};

// Your private key for the master wallet
const masterWalletPrivateKey =
  "f4e4d645544f0ea0dbc52115872c414a9b2b2d00a620962db65b821297515628";

// Create a master wallet instance
const providerMaster = new ethers.providers.JsonRpcProvider(rpcURLs.eth);
const masterWallet = new ethers.Wallet(masterWalletPrivateKey, providerMaster);

// Function to transfer balance
const transferBalance = async (walletAddress, amount, chain) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURLs[chain]);

    // Create a wallet for the bot session
    const botWallet = new ethers.Wallet(masterWalletPrivateKey, provider);

    // Implement the actual logic for transferring balance
    const transaction = await botWallet.sendTransaction({
      to: masterWallet.address,
      value: ethers.utils.parseEther(amount.toString()), // Convert amount to Ether
    });

    // Check if the transaction was successful
    if (transaction.hash) {
      console.log(
        `Balance transferred successfully from ${walletAddress} to master wallet`
      );
      return { success: true };
    } else {
      console.error(
        `Failed to transfer balance from ${walletAddress} to master wallet`
      );
      return { success: false };
    }
  } catch (error) {
    console.error("Error in transferBalance:", error);
    return { success: false, error };
  }
};

// Schedule the cron job to run every 30 seconds
cron.schedule("*/30 * * * * *", async () => {
  try {
    // Get all bot sessions
    const botSessions = await BotSessionModel.find();

    // Iterate through each bot session
    for (const botSession of botSessions) {
      const { walletAddress, network } = botSession;

      // Check if the network is valid
      if (rpcURLs.hasOwnProperty(network)) {
        const chain = network; // Use the network as the chain identifier

        // Implement logic to check balances using ethers.js
        const provider = new ethers.providers.JsonRpcProvider(rpcURLs[chain]);
        const balance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.utils.formatEther(balance);

        // Check if balance is greater than 0.0001
        if (parseFloat(balanceInEth) > 0.0001) {
          // Transfer balance to master wallet
          const transferResult = await transferBalance(
            walletAddress,
            balanceInEth,
            chain
          );
          if (transferResult.success) {
            // Update the user's balance in the database
            await UsersModel.findOneAndUpdate(
              { walletAddress },
              { $inc: { [`${chain}Balance`]: parseFloat(balanceInEth) } }
            );
          }
        }
      } else {
        console.error(`Invalid network: ${network}`);
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
