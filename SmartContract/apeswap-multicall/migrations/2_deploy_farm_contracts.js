const MultiCall = artifacts.require("Multicall");

// let block = await web3.eth.getBlock("latest")
module.exports = async function (deployer, network, accounts) {

   deployer.deploy(MultiCall);
};
