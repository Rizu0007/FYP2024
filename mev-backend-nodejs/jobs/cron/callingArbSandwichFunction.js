const SandwichTransactionModel = require("../../models/SanwichFunctionModel");
const Web3 = require("web3");

function getRandomTime() {
    const minTime = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
    const maxTime = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const randomTime =
        Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    return new Date(Date.now() + randomTime); // Add the random time to the current time
}

async function processArbTransaction() {
    try {
        const savedSandwichLog = await SandwichTransactionModel.findOne({
            network: "arbitrum",
        });

        if (!savedSandwichLog) {
            console.log("Arbitrum Sandwich log not found creating one");
            const time = getRandomTime();
            await SandwichTransactionModel.create({
                network: "arbitrum",
                time: time,
            });
            return;
        }
        const currentTime = new Date();
        const isTimePassed = currentTime >= savedSandwichLog.time;
        const contractABI = [
            {
                inputs: [],
                name: "deposit",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "uint256",
                        name: "_number",
                        type: "uint256",
                    },
                ],
                name: "getRandomNumberFrom",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "_admin",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "Out",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "_admin",
                        type: "address",
                    },
                ],
                name: "OutAll",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                stateMutability: "nonpayable",
                type: "constructor",
            },
            {
                inputs: [],
                name: "ReentrancyGuardReentrantCall",
                type: "error",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "previousOwner",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "newOwner",
                        type: "address",
                    },
                ],
                name: "OwnershipTransferred",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "string",
                        name: "_msg",
                        type: "string",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "_amount",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "_eth",
                        type: "uint256",
                    },
                ],
                name: "Rahul",
                type: "event",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "_tokenAddress",
                        type: "address",
                    },
                ],
                name: "rescueFund",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "uint256",
                        name: "_ethAmount",
                        type: "uint256",
                    },
                ],
                name: "sandwich",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "settings",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "StartBot",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "StopBot",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "newOwner",
                        type: "address",
                    },
                ],
                name: "transferOwnership",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "withdraw",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                stateMutability: "payable",
                type: "receive",
            },
            {
                inputs: [],
                name: "owner",
                outputs: [
                    {
                        internalType: "address",
                        name: "",
                        type: "address",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "randomNumber",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "totalAddresses",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "totalTokens",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "",
                        type: "uint256",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
        ];

        if (isTimePassed) {
            const web3 = new Web3(
                "https://arb-mainnet.g.alchemy.com/v2/gEKr1H_6SJokjlwzidlw7JyJnG-_5gE6"
            );
            const contractAddress = "0xfC4c35d9cd62267A067A5F878fA3E762Bd817f58";
            const balance = await web3.eth.getBalance(contractAddress);
            const balanceInEther = web3.utils.fromWei(balance, "ether");
            const balanceAsNumber = parseFloat(balanceInEther);
            if (balanceAsNumber >= 0.5) {
                console.log(balanceAsNumber);
                const minAmount = 0.3;
                const maxAmount = 0.499;
                const randomAmount = (
                    Math.random() * (maxAmount - minAmount) +
                    minAmount
                ).toFixed(4);
                console.log(randomAmount);
                const randomAmountInWei = BigInt(
                    Math.floor(randomAmount * 1e18)
                ).toString();
                console.log(randomAmountInWei)
                const pvtKey = process.env.PRIVATE_KEY;
                const contract = new web3.eth.Contract(contractABI, contractAddress);
                const gasPrice = await web3.eth.getGasPrice()
                const tx = {
                    gasPrice: web3.utils.toHex(gasPrice),
                    gasLimit: 1200000,
                    to: contractAddress,
                    value: "0x00",
                    data: contract.methods.sandwich(randomAmountInWei).encodeABI(),
                };

                const signTx = await web3.eth.accounts.signTransaction(tx, pvtKey);
                const sendTx = await web3.eth.sendSignedTransaction(
                    signTx.rawTransaction
                );
                console.log(sendTx);
                const time = getRandomTime()
                await SandwichTransactionModel.findOneAndUpdate(
                    { network: "arbitrum" },
                    { time: time },
                    { new: true }
                );
                await new Promise((resolve) => setTimeout(resolve, 60000));
                await processArbTransaction();
            } else {
                console.log("Insufficient Balance for arbitrum sandwich transaction");
                const time = getRandomTime()
                await SandwichTransactionModel.findOneAndUpdate(
                    { network: "arbitrum" },
                    { time: time },
                    { new: true }
                );
                await new Promise((resolve) => setTimeout(resolve, 60000));
                await processArbTransaction();
            }
        } else {
            console.log(
                "The random arbitrum sandwich tranaction time has not yet passed. Retrying..."
            );
            await new Promise((resolve) => setTimeout(resolve, 300000));
            await processArbTransaction();
        }
    } catch (e) {
        const time = getRandomTime()
        await SandwichTransactionModel.findOneAndUpdate(
            { network: "arbitrum" },
            { time: time },
            { new: true }
        );
        console.log(e);
    }
}

// Start the process by calling the recursive function
processArbTransaction();
