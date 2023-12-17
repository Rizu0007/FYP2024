const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    address: String,
    ethBalance: String,
    bnbBalance: String,
    arbBalance: String
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
