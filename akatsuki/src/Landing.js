import { useEffect, useState } from "react";
import React from "react";
// import { Web3Auth } from "@web3auth/modal";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const clientId =
  "BMkKHE4n2KgzLWFXDmpCVIpWMggQ8Pe8_4pRkbm9aNafKnn0WRlb1zoy6JlOh2nN2Aw54jIAbFbsAUut3tuJr8w"; // get from https://dashboard.web3auth.io

function Landing() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [userData, setUserData] = useState({});

  let styles = {
    Portalbutton: {
      width: "100%",
      maxWidth: 235,
      cursor: "pointer",
      background: "#4681f4",
      border: "1px solid #0F6292",
      boxSizing: "border-box",
      borderRadius: "25px",
      fontSize: 26,
      color: "#ffffff",
      fontWeight: 100,
      textAlign: "center",
      padding: "12px 30px 12px 30px",
      marginTop: 15,
      display: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    Startbutton: {
      width: "100%",
      maxWidth: 235,
      cursor: "pointer",
      background: "#4681f4",
      border: "1px solid #0F6292",
      boxSizing: "border-box",
      borderRadius: "25px",
      fontSize: 26,
      color: "#ffffff",
      fontWeight: 100,
      textAlign: "center",
      padding: "12px 30px 12px 30px",
      marginTop: 15,
      marginLeft: 470,
      display: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "100%",
      maxWidth: 220,
      cursor: "pointer",
      background: "#4681f4",
      border: "1px solid #ffffff",
      boxSizing: "border-box",
      borderRadius: "25px",
      fontSize: 26,
      color: "#ffffff",
      fontWeight: 100,
      textAlign: "center",
      padding: "12px 30px 12px 30px",
      marginTop: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com/",
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };
  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.logout();
    setProvider(web3authProvider);
    setBalance("");
    setAddress("");
    setUserData({});
    setChainId("");
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
    console.log(user);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
    setChainId(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };
  const sendContractTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendContractTransaction();
    console.log(receipt);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
      {/*<div className="row">
        <div className="col-md-3">
          <div className="grid">
            <button onClick={getUserInfo} className="card" style={styles.button}>
              Get User Info
            </button>
            <button onClick={getChainId} className="card" style={styles.button}>
              Get Chain ID
            </button>
            <button onClick={getAccounts} className="card" style={styles.button}>
              Get Accounts
            </button>
            <button onClick={getBalance} className="card" style={styles.button}>
              Get Balance
            </button>
            <button onClick={sendTransaction} className="card" style={styles.button}>
              Send Transaction
            </button>
            <button
              onClick={sendContractTransaction}
              className="card"
              style={styles.button}
            >
              Send Approve Transaction
            </button>

            <button onClick={getPrivateKey} className="card" style={styles.button}>
              Get Private Key
            </button>
            <button onClick={logout} className="card" style={styles.button}>
              Logout
            </button>

            <div id="console" style={{ whiteSpace: "pre-line" }}>
              <p style={{ whiteSpace: "pre-line" }}></p>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div style={{ marginTop: 20, textAlign: "left" }}>
            address: {address}
            <br />
            <br />
            chainId: {chainId}
            <br />
            <br />
            balance: {balance}
            <br />
            <br />
            user:{" "}
            <span style={{ fontSize: 12 }}>{JSON.stringify(userData)}</span>
          </div>
        </div>
      </div>*/}

      <div className="row">
        <div>
          <Link to={"/admin"}>
            <button className="card" style={styles.Startbutton}>
              Login as Admin
            </button>
          </Link>
          <br />
          <br />
          <Link to={"/matchlist"}>
            <button className="card" style={styles.Startbutton}>
              Login as User
            </button>
          </Link>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <div>
      <button onClick={login} className="card" style={styles.Startbutton}>
        Login to the portal
      </button>
    </div>
  );

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        color: "white",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <h3 style={{ textAlign: "center", marginTop: 30 }}>
        ICC Web3 Ticket Booking System
      </h3>
      <div className="row">
        <div className="col-md-12">
          <div>{provider ? loggedInView : unloggedInView}</div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
