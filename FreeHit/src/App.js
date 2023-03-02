import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home';
import Highlight from './components/Highlight';
import Live from './components/Live';
import Fixtures from './components/Fixtures';
import NoPage from './components/NoPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/highlight" element={<Highlight />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="*" element={<NoPage />} />             
      </Routes>
    </BrowserRouter>
  )
}

export default App