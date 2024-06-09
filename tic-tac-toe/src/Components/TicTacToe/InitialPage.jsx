import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../App';


function InitialPage() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();
  const { getPreviousWinner } = useContext(GameContext);

  const startGame = () => {
    const previousWinner = getPreviousWinner(player1, player2);
    if (previousWinner === player2) {
      // Swap players if the previous winner was player2
      setPlayer1(player2);
      setPlayer2(player1);
    }
    navigate('/game', { state: { player1, player2 } });
  };

  return (
    <div>
      <input type="text" placeholder="Player X name" value={player1} onChange={(e) => setPlayer1(e.target.value)} />""<br />
      <input type="text" placeholder="Player O name" value={player2} onChange={(e) => setPlayer2(e.target.value)} />""<br />
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default InitialPage;