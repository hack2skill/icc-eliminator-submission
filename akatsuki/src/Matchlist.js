import React from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { useEffect, useState } from "react";
import "./matchlist.css";
// import BuyTickets from "./BuyTickets";

const Matchlist = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      //const web3 = new Web3(process.env.REACT_APP_API_KEY);
      const web3 = new Web3(
        "https://polygon-mumbai.g.alchemy.com/v2/youcESdRlLAkceQH9s89vD7LlaIdrqLz"
      );
      const contractAddress = "0x237Cc8a7AB24A02e42dB24D04a16D5c3b25AC7f7";
      const abi = [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "Quantity",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "Buyer",
              type: "address",
            },
          ],
          name: "BoughtTicket",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "matchId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              indexed: true,
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
          ],
          name: "MatchCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_quantity",
              type: "uint256",
            },
          ],
          name: "buyTicket",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_location",
              type: "string",
            },
            {
              internalType: "string",
              name: "_date",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_totalTickets",
              type: "uint256",
            },
          ],
          name: "createMatch",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllMatches",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "location",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "date",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "totalTickets",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "soldTickets",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isActive",
                  type: "bool",
                },
              ],
              internalType: "struct CricketMatchTicket.Match[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "getApproved",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
          ],
          name: "getMatch",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_matchId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_ticketId",
              type: "uint256",
            },
          ],
          name: "getTicket",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "matchCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "matches",
          outputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "location",
              type: "string",
            },
            {
              internalType: "string",
              name: "date",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "totalTickets",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "soldTickets",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ownerOf",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "tickets",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "tokenURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const contract = new web3.eth.Contract(abi, contractAddress);
      const result = await contract.methods.getAllMatches().call();
      setMatches(result);
    };
    fetchMatches();
  }, []);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  return (
    <div>
      {selectedMatch ? (
        <div class="container1">
          <h1>{selectedMatch[1]}</h1>
          <p>
            Location: {selectedMatch[2]}
            <br />
            Date: {selectedMatch[3]}
            <br />
            Total Tickets: {selectedMatch[4]}
            <br />
            Sold Tickets: {selectedMatch[5]}
            <br />
            Active: {selectedMatch[6].toString()}
          </p>
          <button id="b1" onClick={() => setSelectedMatch(null)}>
            Back to List
          </button>
          <Link to={"/buyTickets"}>
            <button id="b2">Buy Ticket</button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>List of matches</h2>
          <div class="container1">
            {matches.map((match) => (
              //  <li key={match[0]} onClick={() => handleMatchClick(match)}>
              //    <h3>{match[1]}</h3>
              //    <p>Location: {match[2]}</p>
              //  </li>

              <div class="container2">
                <h3 key={match[0]} onClick={() => handleMatchClick(match)}>
                  {match[1]}
                </h3>
              </div>
            ))}
          </div>

          {/* <div class="container2">
                <h3 key={matches[0]} onClick={() => handleMatchClick(matches)}>Ind vs Aus</h3>
              </div>
              <div class="container2">
                <h3 key={matches[0]} onClick={() => handleMatchClick(matches)}>Ind vs Aus</h3>
              </div>
              <div class="container2">
                <h3 key={matches[0]} onClick={() => handleMatchClick(matches)}>Ind vs Aus</h3>
              </div>
              <div class="container2">
                <h3 key={matches[0]} onClick={() => handleMatchClick(matches)}>Ind vs Aus</h3>
              </div>
              <div class="container2">
                <h3 key={matches[0]} onClick={() => handleMatchClick(matches)}>Ind vs Aus</h3>
              </div>
              <div class="container2">
                <h3 key={matches[0]} onClick={() => handleMatchClick(matches)}>Ind vs Aus</h3>
              </div>
              <div class="container2">
                <h3 key={matches[0]} onClick={() => handleMatchClick(matches)}>Ind vs Aus</h3>
              </div> */}
        </div>
      )}
    </div>
  );
};

export default Matchlist;
