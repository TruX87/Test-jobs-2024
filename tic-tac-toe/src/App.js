import './App.css';
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import Scoreboard from './Components/TicTacToe/ScoreBoard';
import InitialPage from './Components/TicTacToe/InitialPage';
import NavBar from './Components/TicTacToe/NavBar';

export const GameContext = createContext();

function App() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
    console.log('history:', history);
    console.log('localStorage:', localStorage.getItem('history'));
  }, [history]);

  const addGameToHistory = (game) => {
    setHistory([...history, game]);
  };

  const getPreviousWinner = (player1, player2) => {
    const previousGame = history.find(
      (game) => game.player1 === player1 && game.player2 === player2
    );
    return previousGame ? previousGame.winner : null;
  };

  return (
    <div className='App'>
    <NavBar /><br />
    {/* <div>
    <TicTacToe />
    </div> */}
    <GameContext.Provider value={{ history, setHistory, addGameToHistory, getPreviousWinner }}>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/game" element={<TicTacToe />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
    </GameContext.Provider>
    </div>
  );
}

export default App;
