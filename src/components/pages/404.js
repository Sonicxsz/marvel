import React from 'react'
import {Link} from 'react-router-dom'
import './404.css'
import Helmet from 'react-helmet'
function NotFound() {
  return (
    <div>
      <Helmet>
        <meta
          name="notFound"
          content="Page not Found"
        />
        <title>Wrong Page</title>
        </Helmet>
      <p className='missPage'>404 Page not Found </p>
        <button className='missBtn'>
        <Link to="/">Comeback to Main Page</Link>
        </button>
    </div>
  )
}

export default NotFound