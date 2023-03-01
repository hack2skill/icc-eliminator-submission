import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import ShoppingCart from "./views/ShoppingCart";
import SingleProduct from "./components/SingleProduct";
import { setGlobalState, truncate, useGlobalState } from "./store";
import Error from "./components/Error";
import Status from "./components/Status";
const App = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div className="min-h-screen">
      <Header />

      <Routes>
        {
          <>
            <Route path="/" element={<Home />} />

            <Route
              path="/shopping"
              element={
                connectedAccount ? (
                  <ShoppingCart />
                ) : (
                  <Error message={"Please Connect Your Wallet !!!"} />
                )
              }
            />
            <Route
              path="/shopping/:id"
              element={
                connectedAccount ? (
                  <SingleProduct />
                ) : (
                  <Error message={"Please Connect Your Wallet !!!"} />
                )
              }
            />
            <Route
              path="/shopping/:id/status"
              element={
                connectedAccount ? (
                  <Status />
                ) : (
                  <Error message={"Please Connect Your Wallet !!!"} />
                )
              }
            />
          </>
        }
      </Routes>
    </div>
  );
};

export default App;
