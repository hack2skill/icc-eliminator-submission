// This transaction is a template for a transaction that
// could be used by anyone to send tokens to another account
// that has been set up to receive tokens.
//
// The withdraw amount and the account from getAccount
// would be the parameters to the transaction

import FungibleToken from 0x9a0766d93b6608b7
import CricToken from 0x2e0e1fc45f23609e

transaction() {

    // The Vault resource that holds the tokens that are being transferred
    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {

        // Get a reference to the signer's stored vault
        let vaultRef = signer.borrow<&CricToken.Vault>(from: CricToken.VaultStoragePath)
			?? panic("Could not borrow reference to the owner's Vault!")

        // Withdraw tokens from the signer's stored vault
        self.sentVault <- vaultRef.withdraw(amount: 1000.00)
    }

    execute {

        // Get the recipient's public account object
        let recipient = getAccount(0x6276f4cb9f8e0ff2)

        // Get a reference to the recipient's Receiver
        let receiverRef = recipient.getCapability(CricToken.ReceiverPublicPath)
            .borrow<&{FungibleToken.Receiver}>()
			?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Deposit the withdrawn tokens in the recipient's receiver
        receiverRef.deposit(from: <-self.sentVault)
    }
}