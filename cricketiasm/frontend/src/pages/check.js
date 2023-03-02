import { useEvmNativeBalance } from "@moralisweb3/next";
import AlchemyWeb3 from "@alch/alchemy-web3";
import { abi, contractAddress, bytecode } from "../../constants";

function HomePage() {
  // const web3 = new Web3(
  //   process.env.ALCHEMY_ENDPOINT_URL,
  //   process.env.ALCHEMY_API_KEY
  // );
  const deployContract = async () => {
    const alchemyWeb3 = AlchemyWeb3.createAlchemyWeb3(
      process.env.ALCHEMY_ENDPOINT_URL,
      {
        url: process.env.ALCHEMY_ENDPOINT_URL,
      }
    );
    const MyContract = new alchemyWeb3.eth.Contract(abi.fractional);
    const deployTx = MyContract.deploy({
      data: bytecode.fractional,
      arguments: [
        "1000",
        contractAddress.nft,
        "1000000000000000",
        "virat",
        "fractions",
      ],
    });

    const accounts = await alchemyWeb3.eth.getAccounts();
    const account = accounts[0];

    deployTx.estimateGas({ from: account }).then((gasEstimate) => {
      deployTx
        .send({
          from: account,
          gas: gasEstimate,
          gasPrice: "1000000000", // replace with your own gas price
        })
        .then((receipt) => {
          console.log("Contract deployed at", receipt.contractAddress);
        });
    });
  };
  // async function deployContract() {
  //   const MyContract = new matic.web3.eth.Contract(abi);
  //   const gasPrice = await matic.web3.eth.getGasPrice();
  //   const gasLimit = 500000;
  //   const deployTx = MyContract.deploy({
  //     data: bytecode.fractional,
  //     arguments: [
  //       "1000",
  //       contractAddress.nft,
  //       "1000000000000000",
  //       "virat",
  //       "fractions",
  //     ],
  //   });
  //   const accounts = await matic.web3.eth.getAccounts();
  //   const account = accounts[0];
  //   console.log(account);
  //   const gasEstimate = await deployTx.estimateGas({ from: account });
  //   const result = await deployTx.send({
  //     from: account,
  //     gas: gasEstimate,
  //     gasPrice,
  //     gasLimit,
  //   });
  //   const contractAddress = result.options.address;
  //   console.log(contractAddress);
  //   return contractAddress;
  // }
  // const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  // const { data: nativeBalance } = useEvmNativeBalance({ address });
  // console.log(nativeBalance);
  return (
    <div>
      <button onClick={async () => await deployContract()}>deploy</button>

      {/* <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3> */}
    </div>
  );
}

export default HomePage;
