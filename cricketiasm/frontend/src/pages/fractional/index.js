import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const Fractional = () => {
  const nftData = useSelector((state) => state.deals.fractionalData);
  const router = useRouter();
  return (
    <div className={`page ${classes["explore-page"]}`}>
      <NavBar />
      <div className={classes.box}>
        <h1>Explore Fractional Items</h1>
        <div className={classes["items"]}>
          {nftData.map((item) => (
            <DiscoverItemsItem
              onBuyNow={() => {
                router.push(`/fractional/buy-now?tokenId=${item.tokenId}`);
              }}
              nftData={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fractional;
