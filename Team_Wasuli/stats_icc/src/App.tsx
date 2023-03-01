import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar.component';
import MainFrame from './component/mainframe.component';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainFrame />
    </div>
  );
}

export default App;
