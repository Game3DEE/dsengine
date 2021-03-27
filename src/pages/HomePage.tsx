import React from 'react'

import {
    Link
} from 'react-router-dom';
  
export default function HomePage() {
    return (
        <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Play</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
        </ul>
        </div>
    )
}
