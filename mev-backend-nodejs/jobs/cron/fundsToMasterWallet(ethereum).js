const cron = require("node-cron");
const { ethers } = require("ethers");
const User = require("../../models/authModel.js");
const UsersModel = require("../../models/UserModel.js");

// Replace this with your actual Infura URL or Ethereum node endpoint
const provider = new ethers.getDefaultProvider(
  "wss://polygon-mumbai-bor.publicnode.com"
);

cron.schedule("*/30 * * * * *", async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const seedPhrase = user.seedPhrase;

      // Use ethers.js to convert seed phrase to private key
      const userWallet = ethers.Wallet.fromMnemonic(seedPhrase);

      // Get the balance of the user's wallet
      const balance = await provider.getBalance(userWallet.address);
      const balanceInEth = ethers.utils.formatEther(balance);
      console.log(balanceInEth);

      // Check if the balance is greater than 0.0001
      if (parseFloat(balanceInEth) > 0.0001) {
        // Estimate gas
        let estimatedGas;
        try {
          estimatedGas = await provider.estimateGas({
            from: userWallet.address,
            to: "0xd00861E97faC75Fd183d28D57f04476dc3c25102",
            value: ethers.utils.parseEther(balanceInEth),
          });
        } catch (error) {
          console.error("Gas estimation failed, using default gas value");
          estimatedGas = ethers.utils.parseUnits("100000", "wei"); // Set a default gas value
        }

        // Calculate gas fees
        const gasPrice = await provider.getGasPrice();
        const gasFees = estimatedGas.mul(gasPrice);

        // Subtract gas fees from the total balance
        const transferAmount = balance.sub(gasFees);

        // Perform the transfer
        const privateKey = userWallet.privateKey;
        const wallet = new ethers.Wallet(privateKey, provider);
        const transaction = await wallet.sendTransaction({
          to: "0xd00861E97faC75Fd183d28D57f04476dc3c25102",
          value: transferAmount,
        });

        // Check if the transaction was successful
        if (transaction.hash) {
          console.log(
            `Funds transferred from ${userWallet.address} to master wallet`
          );

          try {
            // Create new user entry if not exists
            console.log("Hello World");
            const existingUser = await UsersModel.findOne({
              walletAddress: user.walletAddress,
            });

            if (!existingUser) {
              const newUser = new UsersModel({
                walletAddress: userWallet.address,
                ethBalance: parseFloat(balanceInEth),
              });

              await newUser.save();
              console.log(`New user entry created for ${userWallet.address}`);
            } else {
              // Update existing user's ethBalance
              await UsersModel.findOneAndUpdate(
                { walletAddress: user.walletAddress },
                {
                  $set: {
                    ethBalance:
                      existingUser.ethBalance + parseFloat(balanceInEth),
                  },
                }
              );
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.error(
            `Failed to transfer funds from ${userWallet.address} to master wallet`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
