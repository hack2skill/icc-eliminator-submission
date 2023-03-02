import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// alchemy sdk setup
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_POLYGON;
const web3 = createAlchemyWeb3(`https://polygon-mumbai.g.alchemy.com/v2/${alchemyKey}`);

// contract setup
const contractABI = require('./contracts/multiSigWallet/abiArray.json');
const contractAddress = process.env.NEXT_PUBLIC_MULTISIGWALLET_SMART_CONTRACT_ADDRESS_POLYGON;
const multiSigWalletOwnerAddresses = ["0x68D3416b33d52390eA76923dCEbd3926Bd10BECF", "0x379f7dEBf9495D8DE278A4A45A401F27f38564B7", "0x22174dE857CE9447E6d853b5027709DD5be7D807"];

// functions implemented
//---------------------------------------- multiSigWallet ----------------------------------------
// submitTransaction
const multiSigWalletSubmitTransaction = async () => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();
  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.submitTransaction(window.ethereum.selectedAddress, "Rohith Sharma").encodeABI() //make call to NFT smart contract 
  };
  //sign transaction via Metamask
  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
}
// confirmTransactionForAdmins
const multiSigWalletConfirmTransaction = async () => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();
  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.confirmTransaction(0).encodeABI() //make call to NFT smart contract 
  };
  //sign transaction via Metamask
  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    }
  }
}


export { multiSigWalletSubmitTransaction, multiSigWalletConfirmTransaction }




