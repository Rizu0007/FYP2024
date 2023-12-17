const express = require("express");
const router = new express.Router();
const axios = require('axios');

async function getTransactionHistory(network, address) {
    let apiUrl = '';
    const apiKey = process.env.API_KEY; // Use your API key here

    switch(network) {
        case 'eth':
            apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${apiKey}`;
            break;
        case 'bnb':
            apiUrl = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${apiKey}`;
            break;
        case 'arb':
            // Arbitrum API setup (if available)
            throw new Error('Arbitrum transaction history API not set up');
        default:
            throw new Error('Unsupported network');
    }

    try {
        const response = await axios.get(apiUrl);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching transaction history for ${network}:`, error);
        throw error;
    }
}

// Define a route to fetch transaction history

router.get('/transactions/:network/:address', async (req, res) => {
    const { network, address } = req.params;
    try {
        const transactions = await getTransactionHistory(network, address);
        res.json(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;

