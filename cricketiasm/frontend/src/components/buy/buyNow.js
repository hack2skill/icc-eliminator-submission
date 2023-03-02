import classes from "@/styles/buyNow.module.css";
import Image from "next/image";
import virat from "../../../public/virat.jpeg";
import NavBar from "@/components/navigation/navBar";
import { useState } from "react";
import Checkout from "@/components/ui/Checkout";
import { contractAddress } from "../../../constants";
const BuyNow = ({ showInput, onCheckout, nftData }) => {
  console.log(nftData);
  const [isCheckout, setIsCheckout] = useState(false);
  const onClose = () => {
    setIsCheckout(false);
  };
  const loader = nftData.isNoLoader ? null : () => nftData.rawMetaData.image;
  return (
    <div className={`page ${classes["buyNow-page"]}`}>
      <NavBar />
      {isCheckout && (
        <Checkout
          onClose={onClose}
          showInput={showInput}
          onCheckout={onCheckout}
        />
      )}
      {/* //https://ipfs.io/ipfs${nftData.rawMetaData.image.slice(5)} */}
      <div className={classes["buyNow-page-details"]}>
        <div className={classes["left-box"]}>
          <div>
            <Image
              loader={loader}
              src={nftData.rawMetaData.image}
              // src={nft}
              className={classes.nft}
              width={100}
              height={100}
              alt=""
            />
            <div className={classes.details}>
              <p>Contract Address</p>
              <h3 className={classes.contract}>{nftData.contract.address}</h3>
              <p>Token Id</p>
              <h3>{nftData.tokenId}</h3>
              <p>Blockchain</p>
              <h3>ETH</h3>
              {nftData.partsAvailable && (
                <>
                  <p>Parts Available</p>
                  <h3>{nftData.partsAvailable}</h3>
                </>
              )}

              {nftData.contract.address.toLowerCase() ==
                contractAddress.subscriptionNft.toLowerCase() && (
                <>
                  {/* <p>{contractAddress.subscriptionNft}</p> */}
                  <p>TimeLeft</p>
                  <h3>20 days</h3>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes["right-box"]}>
          <h2>{nftData.rawMetaData.name}</h2>
          <p>{nftData.rawMetaData.description}</p>
          <p className={classes["price-text"]}>Market Price</p>
          <h3>0.01 ETH = $ 16.029</h3>
          <button
            className={classes.button}
            onClick={() => setIsCheckout((prev) => !prev)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
