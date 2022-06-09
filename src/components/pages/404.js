import React from 'react'
import {Link} from 'react-router-dom'
import './404.css'
function NotFound() {
  return (
    <div><p className='missPage'>404 Page not Found </p>
        <button className='missBtn'>
        <Link to="/">Comeback to Main Page</Link>
        </button>
    </div>
  )
}

export default NotFound