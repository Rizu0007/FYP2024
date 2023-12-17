// Function to generate a random referral code
const UsersModels = require('../models/UserModel');





function generateCode() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let code = '';

    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        code += alphabet[randomIndex];
    }

    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        code += numbers[randomIndex];
    }

    return code;
}

async function generateUniqueCode() {
    let code = generateCode();
    let existingUser = await UsersModels.findOne({ referralCode: code });

    while (existingUser) {
        code = generateCode();
        existingUser = await UsersModels.findOne({ referralCode: code });
    }

    return code;
}


module.exports = {
    generateUniqueCode
}