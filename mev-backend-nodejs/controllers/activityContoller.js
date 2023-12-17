const asyncHandler = require("express-async-handler");
const { userSuccessMessages } = require("../utils/responseMessages/success.js");
const { userErrorMessages } = require("../utils/responseMessages/error.js");
const {
    useErrorResponse,
    useSuccessResponse,
} = require("../utils/apiResponse/apiResponse");
const ethUtil = require("ethereumjs-util");

// Import model
const UserModel = require("../models/UserModel.js");
const ActivityModel = require("../models/ActivityModel.js")
const { activityType, DepositMessage, transactionStatus, botActivityMessage, WithDrawMessage, networkChain } = require("../utils/enums/index.js");





const generateActivity = asyncHandler(async (req, res) => {
    const { type, amount, txHash, network } = req.body;

    const user = await UserModel.findOne({ walletAddress: req.user.walletAddress })
    const depositMessage = DepositMessage(amount)
    const withdrawMessage = WithDrawMessage(amount)


    if (type === activityType.Deposit) {
        const activity = await ActivityModel.create({
            walletAddress: user.walletAddress,
            amount: amount,
            type: activityType.Deposit,
            activityMessage: depositMessage,
            status: transactionStatus.Completed,
            txHash: txHash,
            network: network
        })

        return useSuccessResponse(
            res,
            "Deposited Successfully",
            activity,
            200
        );
    } else if (type === activityType.StartBot) {
        const activity = await ActivityModel.create({
            walletAddress: user.walletAddress,
            type: activityType.StartBot,
            activityMessage: botActivityMessage.Started,
            network: network
        })
        return useSuccessResponse(
            res,
            "Bot Started Successfully",
            activity,
            200
        );
    }
    else if (type === activityType.StopBot) {
        const activity = await ActivityModel.create({
            walletAddress: user.walletAddress,
            type: activityType.StopBot,
            activityMessage: botActivityMessage.Stopped,
            network: network
        })
        return useSuccessResponse(
            res,
            "Bot Stopped Successfully",
            activity,
            200
        );
    } else if (type === activityType.WithDraw) {
        const activity = await ActivityModel.create({
            walletAddress: user.walletAddress,
            amount: amount,
            type: activityType.WithDraw,
            activityMessage: withdrawMessage,
            status: transactionStatus.Pending,
            txHash: txHash

        })
        return useSuccessResponse(
            res,
            "Withdrawn Successfully",
            activity,
            200
        );

    }

    return useErrorResponse(res, "Error Creating Activity", 429);
})


const getUserActivity = asyncHandler(async (req, res) => {

    const { network } = req.body;

    const walletAddress = req.user.walletAddress;

    const activity = await ActivityModel.find({
        walletAddress: { $regex: new RegExp(`^${walletAddress}$`, 'i') },
        network: network
    }).sort({ createdAt: -1 });

    if (!activity) {
        return useErrorResponse(res, "No Activity Found", 404);
    }

    return useSuccessResponse(
        res,
        "Activity Fetched Successfully",
        activity,
        200
    );
});










module.exports = {
    generateActivity,
    getUserActivity
};
