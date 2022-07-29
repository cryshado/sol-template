import { expect } from 'chai'
import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Holder } from '../typechain-types/Holder'

import '@nomicfoundation/hardhat-chai-matchers'

describe('Payments', () => {
    let account1: SignerWithAddress
    let account2: SignerWithAddress
    let holder: Holder

    beforeEach(async () => {
        [ account1, account2 ] = await ethers.getSigners()

        const HolderFactory = await ethers
            .getContractFactory('Holder', account1)

        holder = await HolderFactory.deploy()
        await holder.deployed()
    })

    it('should be deployed', async () => {
        expect(holder.address).to.be.properAddress
    })

    it('should have 0 ether by default', async () => {
        const balance = await holder._accounts[account1.address]
        expect(balance).to.eq(undefined)
    })

    it('should be possible to send funds', async () => {
        const sum = 100
        const tx = await holder.connect(account2)
            .payFor(account1.address, { value: sum })

        await expect(() => tx)
            .to.changeEtherBalances([ account2, holder ], [ -sum, sum ])

        await tx.wait()

        const balance = await holder._accounts(account1.address)
        expect(balance).to.eq(sum)
    })
})
