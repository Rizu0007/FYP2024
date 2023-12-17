const UserModel = require("../../models/UserModel");
const BotSessionModel = require("../../models/BotSession.js");
const BotActivityModel = require("../../models/BotActivityModel");
const { botActivityType, botActivityMessages } = require("../../utils/enums");

// Function to create a successful bot activity and update user balance with profit
const createSuccessfulBotActivity = async (user, network) => {
  try {



    const updatedUser = await UserModel.findOne({
      walletAddress: user.walletAddress,
    });

    if (network === "arbitrum") {
      const currentBalance = updatedUser.arbBalance;
      const minProfitPercentage = 1;
      const maxProfitPercentage = 4;

      const randomProfitPercentage =
        (Math.random() * (maxProfitPercentage - minProfitPercentage) +
          minProfitPercentage).toFixed(2)

      const profit = (currentBalance * randomProfitPercentage / 100).toFixed(2);


      console.log("succes activity")
      const message = `Sandwich transaction successfull [ +${profit} AETH +${randomProfitPercentage} %]`
      await BotActivityModel.create({
        walletAddress: user.walletAddress,
        type: botActivityType.sandwichTransactionSuccessfull,
        botActivityMessage: message,
        network: network
      });

      // Update user balance with profit
      const updatedUserWithProfit = await UserModel.findOneAndUpdate(
        { walletAddress: user.walletAddress },
        { $inc: { arbBalance: profit } },
        { new: true }
      );

      console.log("Profit:", profit);
      console.log("User balance updated with profit:", updatedUserWithProfit.arbBalance);
    }

    if (network === "ethereum") {
      const currentBalance = updatedUser.ethBalance;
      const minProfitPercentage = 1;
      const maxProfitPercentage = 4;

      const randomProfitPercentage =
        (Math.random() * (maxProfitPercentage - minProfitPercentage) +
          minProfitPercentage).toFixed(2)

      const profit = (currentBalance * randomProfitPercentage / 100).toFixed(2);


      console.log("succes activity")
      const message = `Sandwich transaction successfull [ +${profit} ETH +${randomProfitPercentage} %]`
      await BotActivityModel.create({
        walletAddress: user.walletAddress,
        type: botActivityType.sandwichTransactionSuccessfull,
        botActivityMessage: message,
        network: network
      });

      // Update user balance with profit
      const updatedUserWithProfit = await UserModel.findOneAndUpdate(
        { walletAddress: user.walletAddress },
        { $inc: { ethBalance: profit } },
        { new: true }
      );

      console.log("Profit:", profit);
      console.log("User balance updated with profit:", updatedUserWithProfit.ethBalance);

    }

  } catch (error) {
    console.error("Error occurred while processing user balance:", error);
  }
};

// Function to create a scanning mempool bot activity
const createScanningMempoolBotActivity = async (user, network) => {
  await BotActivityModel.create({
    walletAddress: user.walletAddress,
    type: botActivityType.scanningMempool,
    botActivityMessage: botActivityMessages.ScanningMemePool,
    network: network
  });
  console.log("Scanning Mempool bot activity created for user:", user.walletAddress);
};

// Function to create a failed bot activity
const createFailedBotActivity = async (user, network) => {
  await BotActivityModel.create({
    walletAddress: user.walletAddress,
    type: botActivityType.sandwichTransactionFailed,
    botActivityMessage: botActivityMessages.SandwichTransactionFailed,
    network: network
  });
  console.log("Failed bot activity created for user:", user.walletAddress);
};

const processActiveUsersWithBotSessions = async () => {
  try {
    console.log("process active user");
    const activeBotSessions = await BotSessionModel.find({
      botStarted: true,
      botStopped: false,
    }).populate("network");

    if (activeBotSessions.length === 0) {
      console.log("No active bot sessions found.");
      return;
    }

    const activeUsers = await UserModel.find({
      walletAddress: { $in: activeBotSessions.map(session => session.walletAddress) },
    });

    let failedNumber = Math.floor(Math.random() * 2) + 4; // Random number between 4 and 5
    let successCounter = 0;

    for (const user of activeUsers) {
      const session = activeBotSessions.find(session => session.walletAddress === user.walletAddress);

      // Check if the session's randomTime has already passed
      if (session.randomTime <= new Date()) {
        const network = session.network;
        await createSuccessfulBotActivity(user, network);
        successCounter++;
        if (successCounter >= failedNumber) {
          await createFailedBotActivity(user, network);
          // Reset successCounter to 0
          successCounter = 0;
          failedNumber = Math.floor(Math.random() * 2) + 4; // Generate a new random number
        }

        await new Promise(resolve => setTimeout(resolve, 60000));
        // Create mempool scanning activity
        await createScanningMempoolBotActivity(user, network);
        await new Promise(resolve => setTimeout(resolve, 60000));
        // Update randomTime for the current botSession to a new random time within the next 2 to 4 hours
        const randomIntervalInMilliseconds = Math.floor(Math.random() * (4 - 2 + 1) + 2) * 60 * 60 * 1000;
        const randomTime = new Date(new Date().getTime() + randomIntervalInMilliseconds);

        session.randomTime = randomTime;
        await session.save();

        console.log("Updated randomTime for botSession:", session._id, "to", randomTime);
      } else {
        const timeRemaining = session.randomTime.getTime() - new Date().getTime();
        console.log(
          `Bot session ${session._id} still has time remaining: ${timeRemaining} milliseconds`
        );
      }
    }
  } catch (error) {
    console.error("Error occurred while processing active users:", error);
  }
};


const startBotProcessWithRandomDelay = async () => {
  try {
    while (true) {
      const currentTime = new Date();
      const activeBotSessions = await BotSessionModel.find({
        botStarted: true,
        botStopped: false,
        randomTime: { $lte: currentTime }, // Find bot sessions with random time passed or equal to current time
      });

      if (activeBotSessions.length === 0) {
        console.log("No bot sessions with random time passed found.");
        await new Promise((resolve) => setTimeout(resolve, 300000));
        continue;
      }

      for (const botSession of activeBotSessions) {
        // Fetch the user associated with the botSession
        const user = await UserModel.findOne({ walletAddress: botSession.walletAddress });

        // Process the user and update randomTime only after processing
        await processActiveUsersWithBotSessions(user, botSession);

        // Update randomTime for the current botSession to a new random time within the next 2 to 4 hours
        const randomIntervalInMilliseconds = Math.floor(Math.random() * (4 - 2 + 1) + 2) * 60 * 60 * 1000;
        const newRandomTime = new Date(currentTime.getTime() + randomIntervalInMilliseconds);

        botSession.randomTime = newRandomTime;
        await botSession.save();

        console.log("Updated randomTime for botSession:", botSession._id, "to", newRandomTime);

        // Random delay between user sessions (between 0 and 10 minutes)
        const randomDelayInMilliseconds = Math.floor(Math.random() * (10 * 60 * 1000));
        await new Promise(resolve => setTimeout(resolve, randomDelayInMilliseconds));
      }
    }
  } catch (error) {
    console.error("Error occurred while starting the bot process:", error);
  }
};


// Call the function to start the bot process with a random delay
startBotProcessWithRandomDelay().catch((error) => {
  console.error("Error occurred while running bot process:", error);
});