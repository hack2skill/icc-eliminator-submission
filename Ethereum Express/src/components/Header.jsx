import Identicon from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GiAmericanFootballHelmet, GiBaseballGlove } from "react-icons/gi";
import { setGlobalState, truncate, useGlobalState } from "../store";

import { useState } from "react";
import Wallets from "./Wallets";

const Header = () => {
  const navigate = useNavigate();
  // const [cart] = useGlobalState('cart')
  const [showWallet,setShowWallet]=useState(false);
  const [connectedAccount] = useGlobalState("connectedAccount");
  const closeModal=()=>{
    setShowWallet(false);
  }
  return (
    <>
      <div className="flex justify-between items-center shadow-sm shadow-gray-200 p-5">
        <Link
          to="/"
          className="flex justify-start items-center space-x-1 text-md font-bold"
        >
          <GiAmericanFootballHelmet size={50} className="cursor-pointer" />
          <span>Ethereum Express</span>
        </Link>

        <div className="flex justify-end items-center space-x-6">
          <div className="flex justify-center items-center space-x-4">
            <Link
              to="/shopping"
              className="flex justify-start items-center space-x-1 text-md font-bold"
            >
              <GiBaseballGlove size={30} className="cursor-pointer" />
              <span>Shopping</span>
            </Link>
            {/* <button
            onClick={() => navigate('/cart')}
            className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex 
            align-center cursor-pointer active:bg-gray-300 transition duration-300 
            ease w-max py-1 px-2"
          >
            <AiOutlineShoppingCart className="cursor-pointer" size={25} />
            <span
              className="rounded-full py-[2px] px-[10px] text-center font-bold
            bg-red-600 text-white ml-2"
            >
              {cart.length}
            </span>
          </button> */}
          </div>
          {connectedAccount ? (
            <button
              className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
            focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
            active:shadow-lg transition duration-150 ease-in-out"
            >
              {truncate(connectedAccount, 4, 4, 11)}
            </button>
          ) : (
            <button
              className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
            focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
            active:shadow-lg transition duration-150 ease-in-out"
              onClick={()=>{
                setShowWallet(!showWallet);
              }}
            >
              Connect
            </button>
          )}
        </div>
      </div>

      {showWallet ? <div className="wallet">
        <div className="wallet-part">
        <Wallets closeModal={closeModal} />
        </div>
      </div> :null}
    </>
  );
};

export default Header;
