
import FungibleToken from 0x9a0766d93b6608b7
import CricToken from 0x2e0e1fc45f23609e

// This script reads the balance field of an account's CricToken Balance

pub fun main(): UFix64 {
    let acct = getAccount(0x2fb7ab62360c973e)
    let vaultRef = acct.getCapability(CricToken.BalancePublicPath)
        .borrow<&CricToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}