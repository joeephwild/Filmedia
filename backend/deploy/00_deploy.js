require('hardhat-deploy')
require('hardhat-deploy-ethers')

const { networkConfig } = require('../helper-hardhat-config')

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments
    console.log('Wallet Ethereum Address:', wallet.address)
    const chainId = network.config.chainId

    //deploy FilMediaArtistNFT
    const filMediaArtistNFT = await deploy('FilMediaArtistNFT', {
        from: wallet.address,
        args: [],
        log: true,
    })

    //deploy FilMediaMarketplace
    const filMediaMarketplace = await deploy('FilMediaMarketplace', {
        from: wallet.address,
        args: [],
        log: true,
    })

    //deploy FilMediaDynamicNFT
    const filMediaDynamicNFT = await deploy('FilMediaDynamicNFT', {
        from: wallet.address,
        args: [filMediaMarketplace.address],
        log: true,
    })

    //deploy FilMediaNFT
    const filMediaNFT = await deploy('FilMediaNFT', {
        from: wallet.address,
        args: [],
        log: true,
    })

    //deploy Subscription
    const subscription = await deploy('Subscription', {
        from: wallet.address,
        args: [],
        log: true,
    })

    console.log(`deployed ${filMediaArtistNFT.address}`)
}
