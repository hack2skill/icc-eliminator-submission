// This transaction is a template for a transaction to allow
// anyone to add a Vault resource to their account so that
// they can use the CricToken

import FungibleToken from 0x9a0766d93b6608b7
import CricToken from 0x2e0e1fc45f23609e

// This transaction is a template for a transaction to allow
// anyone to add a Vault resource to their account so that
// they can use the CricToken

transaction {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a CricToken Vault
        if signer.borrow<&CricToken.Vault>(from: CricToken.VaultStoragePath) != nil {
            return
        }

        // Create a new CricToken Vault and put it in storage
        signer.save(
            <-CricToken.createEmptyVault(),
            to: CricToken.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&CricToken.Vault{FungibleToken.Receiver}>(
            CricToken.ReceiverPublicPath,
            target: CricToken.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the balance field through the Balance interface
        signer.link<&CricToken.Vault{FungibleToken.Balance}>(
            CricToken.BalancePublicPath,
            target: CricToken.VaultStoragePath
        )
    }
}