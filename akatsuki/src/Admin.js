import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./admin.css";
function Admin() {
  const [matchName, setMatchName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [totalTickets, setTotalTickets] = useState(0);

  const handleMatchNameChange = (event) => {
    setMatchName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTotalTicketsChange = (event) => {
    setTotalTickets(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMatch = {
      matchName: matchName,
      location: location,
      date: date,
      totalTickets: totalTickets,
    };
    // Do something with the new match data
  };

  return (
    <form id="admin" onSubmit={handleSubmit}>
      <h1>Admin console for adding matches</h1>
      <div className="container1">
        <div>
          <label htmlFor="matchName">Match Name:</label>
          <input
            type="text"
            id="matchName"
            value={matchName}
            onChange={handleMatchNameChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label htmlFor="totalTickets">Total Tickets:</label>
          <input
            type="number"
            id="totalTickets"
            value={totalTickets}
            onChange={handleTotalTicketsChange}
          />
        </div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default Admin;
