
function getNetworkConfig(network, accounts) {
    if(["bsc", "bsc-fork"].includes(network)) {
        console.log(`Deploying with BSC MAINNET config.`)
        return {
            adminAddress: '0x6c905b4108A87499CEd1E0498721F2B831c6Ab13', // General Admin
            feeAccount: '0xCEf34e4db130c8A64493517985b23af5B13E8cc6', // Proxy Admin
            masterApeAddress: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9', // Production
            // masterApeAddress: '0x7C2d70FC900b289A82428f47da2504428Fc92dcB', // Dummy
            masterApeAdminOwner: '0x3c873C63dA3160f9ea58a8cBD5283C29300DC6d9', // OZ Timelock Beta
            farmAdmin: '0xED1EE002970805Cd8b0270BEA58907327e867f29', // OZ Timelock Alpha
            STARTING_BLOCK: 4853714,
            TOKENS_PER_BLOCK: 10,
            TIMELOCK_DELAY_SECS: 3600 * 6,
            INITIAL_MINT: '25000',
        }
    } else if (['testnet', 'bsc-testnet-fork'].includes(network)) {
        console.log(`Deploying with BSC testnet config.`)
        return {
            adminAddress: '0xda05b35E23841497803ae3c966f53bf20683cA12', // General Admin
            feeAccount: '0xda05b35E23841497803ae3c966f53bf20683cA12', // Proxy Admin
            masterApeAddress: '0x91eb7c43B5305B03127D67B6A3bf57087A0C4364',
            masterApeAdminOwner: '0xda05b35E23841497803ae3c966f53bf20683cA12', 
            farmAdmin: '0xda05b35E23841497803ae3c966f53bf20683cA12',
            STARTING_BLOCK: 12338486,
            TOKENS_PER_BLOCK: 10,
            TIMELOCK_DELAY_SECS: 3600 * 6,
            INITIAL_MINT: '25000',
        }
    } else if (['development'].includes(network)) {
        console.log(`Deploying with development config.`)
        return {
            adminAddress: '0x6c905b4108A87499CEd1E0498721F2B831c6Ab13', // General Admin
            feeAccount: '0xCEf34e4db130c8A64493517985b23af5B13E8cc6', // Proxy Admin
            masterApeAddress: '0x',
            masterApeAdminOwner: '0x',
            farmAdmin: '0x',
            STARTING_BLOCK: 0,
            TOKENS_PER_BLOCK: 10,
            TIMELOCK_DELAY_SECS: 3600 * 6,
            INITIAL_MINT: '25000',
        }
    } else {
        throw new Error(`No config found for network ${network}.`)
    }
}

module.exports = { getNetworkConfig };
