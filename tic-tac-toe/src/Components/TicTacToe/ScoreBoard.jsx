import React, { useContext } from 'react';
import { GameContext } from '../../App';

function Scoreboard() {
  const { history } = useContext(GameContext);

  return (
    <div>
      <h1>Scoreboard</h1>
      {history.map((game, index) => (
        <div key={index}>
          <p>Player 1: {game.player1}</p>
          <p>Player 2: {game.player2}</p>
          <p>Winner: {game.winner}</p>
        </div>
      ))}
    </div>
  );
}

export default Scoreboard;