const hre = require("hardhat");
const ethers = require('ethers')

const tokens = (nToken) => {
    return ethers.utils.parseUnits(nToken.toString(), 'ether');
}

async function main() {
    // DEPLOY TOKEN CONTRACT

    const _initialSupply = tokens(100000);

    const ComsatsCoin = await hre.ethers.getContractFactory("ComsatsCoin");

    const comsatsCoin = await ComsatsCoin.deploy(_initialSupply);

    await comsatsCoin.deployed();

    console.log(`ComsatsCoin Address: ${comsatsCoin.address}`);


    //--TOKEN SALE CONTRACT
    const _tokenPrice = tokens(1);

    const TokenSale = await hre.ethers.getContractFactory("TokenSale");
    const tokenSale = await TokenSale.deploy(comsatsCoin.address, _tokenPrice);

    await tokenSale.deployed();
    console.log(`the token sale contract address: ${tokenSale.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})