import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InitialPage() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();

  const startGame = () => {
    // Add logic to check history and set player1 as the previous winner if applicable
    navigate('/game');
  };

  return (
    <div>
      <input type="text" placeholder="Player 1" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
      <input type="text" placeholder="Player 2" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default InitialPage;
