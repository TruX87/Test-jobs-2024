import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
        <Link to="/">
            <button>New game</button>
        </Link>""

        <Link to="/scoreboard">
            <button>Scoreboard</button>
        </Link>
    </div>
  )
}

export default NavBar