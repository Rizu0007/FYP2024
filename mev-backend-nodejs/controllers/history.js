const ethers = require("ethers");
require("dotenv").config();
const mongoose = require("mongoose");
const { Wallet, Deposit, Notifications } = require("../models/history.js"); // Adjust the path as necessary


const bscProvider = new ethers.providers.WebSocketProvider(process.env.BSC_NODE_WSS);
const ethProvider = new ethers.providers.WebSocketProvider(process.env.ETH_NODE_WSS);
const arbProvider = new ethers.providers.WebSocketProvider(process.env.ARB_NODE_WSS);

async function listenForTransfers(provider, networkName) {
    console.log(`Listening for transfers on ${networkName}`);

    provider.on('block', async (blockNumber) => {
        try {
            const block = await provider.getBlockWithTransactions(blockNumber);
            // console.log(block)

            for (const transaction of block.transactions) {
                const toAddress = transaction.to;
                if (!toAddress) continue; // Skip contract creation transactions

                const value = ethers.utils.formatEther(transaction.value);

                const matchingWallets = await Wallet.find({ [`${networkName}_wallet`]: toAddress.toLowerCase() });

                for (const wallet of matchingWallets) {
                    console.log(`Transfer Detected: ${value} on ${networkName} to ${wallet[`${networkName}_wallet`]}`);
                    
                    const newDeposit = new Deposit({
                        user_id: wallet.user_id,
                        status: "approved",
                        status_description: "Deposit Successful",
                        requested_at: new Date(),
                        from: transaction.from,
                        to: transaction.to,
                        walletType: networkName.toUpperCase(),
                        value: value,
                        tx_hash: transaction.hash,
                        amount: value
                    });
                    await newDeposit.save();

                    wallet.balance = parseFloat(wallet.balance) + parseFloat(value);
                    await wallet.save();

                    const notification = new Notifications({
                        user_id: wallet.user_id,
                        content: `${value} has been deposited to your wallet on ${networkName}`
                    });
                    await notification.save();

                }
            }
        } catch (error) {
            console.error(`Error processing block ${blockNumber} on ${networkName}:`, error);
        }
    });
};
async function getTransactionHistory(network, address) {
    let url;
    const apiKey = process.env.ETHERSCAN_API_KEY; // Use your Etherscan and BscScan API keys

    switch (network) {
        case 'eth':
            url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
            break;
        case 'bnb':
            url = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
            break;
        case 'arb':
            // Arbitrum doesn't have a direct equivalent to Etherscan, so you might need to find a different method or service for fetching transaction history.
            throw new Error('Arbitrum transaction history API not set up');
        default:
            throw new Error('Unsupported network');
    }

    try {
        const response = await axios.get(url);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching transaction history for ${network}:`, error);
        throw error;
    }
}

listenForTransfers(bscProvider, 'bsc');
listenForTransfers(ethProvider, 'eth');
listenForTransfers(arbProvider, 'arb');
const listenForTransfer=[ { network:'bsc' , provider: bscProvider}, { network:'eth' , provider: ethProvider}, { network:'arb' , provider: arbProvider}]
module.exports = { listenForTransfer  , getTransactionHistory};
