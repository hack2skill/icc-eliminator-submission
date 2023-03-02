import BuyNow from "@/components/buy/buyNow";
import useWeb3 from "@/components/useWeb3";
import { useEffect, useInsertionEffect, useState } from "react";
import { abi, contractAddress, bytecode } from "../../../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const nftData = useSelector((state) => state.deals.nftsData);
  const [check, setCheck] = useState(false);
  const [buyPrice, setBuyPrice] = useState(0);
  let activateBuy;
  // let buyPrice;
  const { runContractFunction: getPrice } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "getPrice",
    params: { tokenId: tokenId },
  });
  const { runContractFunction: buyTokens } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "buyTokens",
    msgValue: buyPrice,
    params: { tokenId: tokenId },
  });
  const { runContractFunction: checkSale } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "checkSale",
    params: { tokenId: tokenId },
  });

  const { account, connectWallet, isWeb3Enabled, Moralis } = useWeb3();
  useEffect(() => {
    async function buy() {
      await buyTokens({
        onSuccess: handleSuccess,
        onError: (err) => {
          console.log(err);
        },
      });
    }
    if (check) {
      console.log(buyPrice);
      buy();
      setBuyPrice(10000000000000000);
    }
    setCheck(false);
  }, [buyPrice]);

  const checkoutBuy = async () => {
    setCheck(true);
    console.log("This is nfts buy button.");
    const tokenId = 1;
    const bigNumber = await getPrice();
    setBuyPrice(Number(bigNumber));
    console.log(buyPrice);

    activateBuy = await checkSale();
    console.log(activateBuy);
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      //   updateUIValues();
      //   handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BuyNow
        showInput={false}
        onCheckout={checkoutBuy}
        activateBuy={activateBuy}
        nftData={nftData[Number(tokenId) - 1]}
      />
      {/* <button
        onClick={async () => {
          // setError({ error: false, msg: "" });
          // await Moralis.enableWeb3();

          await buyTokens({
            onSuccess: handleSuccess,
            onError: (err) => {
              console.log(err);
              // setError({
              //   error: true,
              //   msg: "Please try again later.",
              // });
            },
          });
        }}
      >
        Mint NFT
      </button> */}
    </>
  );
};
export default buyNow;
