// This transaction is a template for a transaction to allow
// anyone to add a Vault resource to their account so that
// they can use the NFTVerseToken

import FungibleToken from 0x9a0766d93b6608b7
import CricToken from 0x2e0e1fc45f23609e

transaction() {
    /// Reference to the Example Token Admin Resource object
    let tokenAdmin: &CricToken.Administrator

    /// Reference to the Fungible Token Receiver of the recipient
    let tokenReceiver: &{FungibleToken.Receiver}

    /// The total supply of tokens before the burn
    let supplyBefore: UFix64

    prepare(signer: AuthAccount) {
        self.supplyBefore = CricToken.totalSupply

        // Borrow a reference to the admin object
        self.tokenAdmin = signer.borrow<&CricToken.Administrator>(from: CricToken.AdminStoragePath)
            ?? panic("Signer is not the token admin")

        // Get the account of the recipient and borrow a reference to their receiver
        self.tokenReceiver = getAccount(0x2e0e1fc45f23609e)
            .getCapability(CricToken.ReceiverPublicPath)
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("Unable to borrow receiver reference")
    }

    execute {

        // Create a minter and mint tokens
        let minter <- self.tokenAdmin.createNewMinter(allowedAmount: 100000000.00)
        let mintedVault <- minter.mintTokens(amount: 100000000.00)

        // Deposit them to the receiever
        self.tokenReceiver.deposit(from: <-mintedVault)

        destroy minter
    }

    post {
        CricToken.totalSupply == self.supplyBefore + 100000000.00: "The total supply must be increased by the amount"
    }
}
