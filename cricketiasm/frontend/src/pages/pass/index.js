import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import { dealsActions } from "@/store/deals";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFetchData } from "../api/useFetchData";
const Pass = () => {
  const { isLoading } = useFetchData(
    "http://localhost:8000/pass-data",
    dealsActions.addPassData
  );
  const passData = useSelector((state) => state.deals.passData);
  console.log(passData);
  const router = useRouter();
  const buyNow = () => {
    router.push("/pass/buy-now");
  };
  return (
    <div className={`page ${classes["explore-page"]}`}>
      <NavBar />
      <div className={classes.box}>
        <h1>Explore Pass Items</h1>
        <div className={classes["items"]}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            passData.map((item) => (
              <DiscoverItemsItem
                onBuyNow={() => {
                  router.push(`/pass/buy-now?tokenId=${item.tokenId}`);
                }}
                nftData={item}
              />
            ))
          )}
          {passData.length === 0 && !isLoading && <h1>No Data Found.</h1>}
        </div>
      </div>
    </div>
  );
};

export default Pass;
