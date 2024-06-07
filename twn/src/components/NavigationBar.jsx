import React from 'react'
import { Link } from "react-router-dom";
import "../css/NavigationBar.css";

function NavigationBar() {
  return (
    <nav>
      <div className="navbar">
      <Link to="/">
          <span>
            <img className='nav-logo' src="logo.svg" alt="" />
          </span>
        </Link>
        <ul className='nav-ul'>
            <li className='nav-li'>
            <Link to="/artikkel" style={{ textDecoration: 'none' }}>
              <span className='nav-span'>Artikkel</span>

            </Link>
            </li>
            <li className='nav-li'>
            <Link to="/tabel" style={{ textDecoration: 'none' }}>
              <span className='nav-span'>Tabel</span>
            </Link>
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavigationBar