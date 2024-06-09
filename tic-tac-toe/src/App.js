import './App.css';
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import Scoreboard from './Components/TicTacToe/ScoreBoard';
import InitialPage from './Components/TicTacToe/InitialPage';

export const GameContext = createContext();

function App() {
  const [history, setHistory] = useState([]);

  return (
    // <div>
    //   <TicTacToe />
    // </div>
    <GameContext.Provider value={{ history, setHistory }}>
      
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/game" element={<TicTacToe />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
      
    </GameContext.Provider>
  );
}

export default App;
