import React, { useState, useEffect } from "react";
import styles from "./MatchInfo.module.css";

function MatchInfo() {
  const [matchInfo, setMatchInfo] = useState(null);
  const [ticketsAvailable, setTicketsAvailable] = useState(null);

  // useEffect(() => {
  //       fetch('https://cricketapi21.p.rapidapi.com/api/cricket/search/kabul%27)
  // .then(response => response.json())
  // .then(data => {
  // setMatchInfo(data);
  // setTicketsAvailable(data.ticketsAvailable);
  // })
  // .catch(error => console.error(error));
  // }, []);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5af0ae2226msha2ce316b1320471p1183c2jsn3ccdeca04e99",
      "X-RapidAPI-Host": "cricketapi21.p.rapidapi.com",
    },
  };

  const handleBuyTicketsClick = () => {
    setTicketsAvailable(ticketsAvailable - 1);
    alert("You have successfully bought a ticket!");
    // you have to change this to proceed with next screens
  };

  if (!matchInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.MatchInfo}>
      <h1>Match Name: {matchInfo.name}</h1>
      <p>Stadium: {matchInfo.stadium}</p>
      <p>Date: {matchInfo.date}</p>
      <p>Tickets available: {ticketsAvailable}</p>
      <button className={styles.buyButton} onClick={handleBuyTicketsClick}>
        Buy Tickets
      </button>
      {/*       here also you have to edit */}
    </div>
  );
}

export default MatchInfo;
