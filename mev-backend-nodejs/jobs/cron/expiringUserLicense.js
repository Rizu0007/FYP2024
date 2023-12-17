const UserModel = require("../../models/UserModel");
const { licenseType } = require("../../utils/enums");

module.exports = async () => {
  const users = await UserModel.find({});

  const currentTime = new Date();
  const expiredUsers = [];
  console.log("Scanning for License Time")

  for (const user of users) {
    if (user.licenseStatus === "active") {
      // Assuming "active" is the status for an active license
      const licenseTypeValue = user.licenseType;

      if (licenseTypeValue === licenseType.SixMonth) {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        if (user.licenseTime <= sixMonthsAgo) {
          const daysPassed = Math.floor(
            (currentTime - user.licenseTime) / (1000 * 60 * 60 * 24)
          );

          if (daysPassed >= 180) {
            // Checking if 6 months (180 days) have passed
            // Expire the license
            user.licenseStatus = "expired"; // Assuming "expired" is the status for an expired license
            user.licenseTime = null; // Clear the license time if needed

            // Save the updated user
            await user.save();

            // Add user details to the list of expired users
            expiredUsers.push({
              walletAddress: user.walletAddress,
              licenseType: licenseTypeValue,
            });
          }
        }
      } else if (licenseTypeValue === licenseType.Year) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        if (user.licenseTime <= oneYearAgo) {
          const daysPassed = Math.floor(
            (currentTime - user.licenseTime) / (1000 * 60 * 60 * 24)
          );

          if (daysPassed >= 365) {
            // Checking if 1 year (365 days) has passed
            // Expire the license
            user.licenseStatus = "expired"; // Assuming "expired" is the status for an expired license
            user.licenseTime = null; // Clear the license time if needed

            // Save the updated user
            await user.save();

            // Add user details to the list of expired users
            expiredUsers.push({
              walletAddress: user.walletAddress,
              licenseType: licenseTypeValue,
            });
          }
        }
      }
    }
  }

  // Log all expired users
  console.log("Expired Licenses:");
  for (const expiredUser of expiredUsers) {
    console.log("Wallet Address:", expiredUser.walletAddress);
    console.log("License Type:", expiredUser.licenseType);
    console.log("------------------------");
  }
};
