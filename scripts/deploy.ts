import { ethers } from 'hardhat'

async function main () {
    const Holder = await ethers.getContractFactory('Holder')
    const holder = await Holder.deploy()

    await holder.deployed()
    console.log('Holder deployed to:', holder.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
