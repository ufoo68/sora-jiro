import React from 'react'
import { Link } from "react-router-dom"

export const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/withsensor'>センサーあり</Link>
        </li>
        <li>
          <Link to='/withoutsensor'>センサーなし</Link>
        </li>
      </ul>
    </div>
  )
}
