const UserModel = require("../../models/UserModel");

module.exports = async () => {
    const users = await UserModel.find({});
    const currentTime = new Date();
    console.log("Scanning for free Tier Time")

    for (const user of users) {
        const fifteenDaysInMillis = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
        const creationTime = user.createdAt.getTime();
        const elapsedTimeInMillis = currentTime - creationTime;

        if (elapsedTimeInMillis >= fifteenDaysInMillis && user.freeTierStatus === "active") {
            user.freeTierStatus = "expired";
            await user.save();
            console.log(`User ${user.walletAddress} free tier expired`);
        }
    }
};
