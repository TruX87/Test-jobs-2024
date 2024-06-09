import React, { useContext } from 'react';
import { GameContext } from '../../App';
import './ScoreBoard.css'

function Scoreboard() {
  const { history } = useContext(GameContext);

  return (
    <div className='SBcontainer'>
      <h1 className='SBtitle'>Scoreboard</h1>
      {/* {history.map((game, index) => (
        <div className='SBdata' key={index}>
          <p>Player X Name: {game.player1}</p>
          <p>Player O Name: {game.player2}</p>
          <p>Winner: {game.winner}</p> */}

        <table className='SBtable'>
        <thead>
          <tr>
            <th>Player X</th>
            <th>Player O</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
      {history.map((game, index) =>
         <tr key={index}>
          <td>{game.player1}</td>
          <td>{game.player2}</td>
          <td>{game.winner}</td>
          </tr>
         )}
         </tbody>
        </table>

        {/* </div>
      ))} */}
    </div>
  );
}

export default Scoreboard;