import React, { useState } from "react";
import styles from "./TicketPurchase.module.css";

function TicketPurchase() {
  const [ticketCount, setTicketCount] = useState(0);
  const [userInput, setUserInput] = useState(0);
  const MAX_TICKETS = 10;

  const handleInputChange = (event) => {
    const inputVal = parseInt(event.target.value);
    setUserInput(inputVal > MAX_TICKETS ? MAX_TICKETS : inputVal);
  };

  const handleBuyClick = () => {
    const purchasedTickets = parseInt(userInput);
    setTicketCount(
      ticketCount + purchasedTickets > MAX_TICKETS
        ? MAX_TICKETS
        : purchasedTickets
    );
    setUserInput(0);
    alert("You have successfully bought a ticket!");
  };

  return (
    <div className={styles.TicketPurchase}>
      <div className={styles.userInputBox}>
        <h2>Enter Amount of Tickets:</h2>
        <input type="number" value={userInput} onChange={handleInputChange} />
        <button onClick={handleBuyClick}>Buy</button>
      </div>
    </div>
  );
}

export default TicketPurchase;
