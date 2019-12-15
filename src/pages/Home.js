import React, { useState } from 'react'
import { withRouter } from "react-router-dom";

import './Home.css'

const Home = props => {
  // states
  const [text, setText] = useState('')

  // methods
  const submit = e => {
    e.preventDefault()

    props.history.push({ pathname: '/overview', search: 'name=' + text })
    setText('')
  }

  const handleOnchange = e => setText(e.target.value)

  return (
    <main id="home-page">
      <form onSubmit={ submit }>
        <h1 className="mb-3">Employee Explorer</h1>
        <div className="form-fields">
          <input
            type="text"
            placeholder="Enter name here..."
            value={ text }
            onChange={ handleOnchange }
          >
          </input>
          <button>Search</button>
        </div>
      </form>
    </main>
  )
}

export default withRouter(Home)