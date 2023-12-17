const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user_id: String,
    balance: Number,
    bsc_wallet: String,
    // Other fields as required
});

const depositSchema = new mongoose.Schema({
    user_id: String,
    status: String,
    status_description: String,
    requested_at: Date,
    from: String,
    to: String,
    walletType: String,
    value: String,
    tx_hash: String,
    amount: String,
    // Other fields as required
});

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // Other fields as required
    // Remove isAdmin field if it's no longer needed
});

const Wallet = mongoose.model('Walletss', walletSchema);
const Deposit = mongoose.model('Deposit', depositSchema);
const Notifications = mongoose.model('Notifications', notificationSchema);

module.exports = { Wallet, Deposit, Notifications };
