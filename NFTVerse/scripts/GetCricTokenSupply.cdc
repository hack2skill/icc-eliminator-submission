// This script reads the total supply field
// of the crictoken smart contract

import CricToken from 0x2e0e1fc45f23609e

pub fun main(): UFix64 {

    let supply = NFTVerseToken.totalSupply

    log(supply)

    return supply
}