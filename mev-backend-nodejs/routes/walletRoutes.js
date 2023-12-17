const express = require('express');
const Wallet = require('../models/Wallet.js');
const router = express.Router();

// Endpoint to save wallet data
router.post('/saveWalletData', async (req, res) => {
    try {
        const { address, ethBalance, bnbBalance, arbBalance } = req.body;
        const wallet = new Wallet({ address, ethBalance, bnbBalance, arbBalance });
        await wallet.save();
        res.status(200).send('Wallet data saved successfully');
    } catch (error) {
        res.status(500).send('Error saving wallet data: ' + error.message);
    }
});

module.exports = router;
