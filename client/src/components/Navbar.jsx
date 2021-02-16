import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Navbar() {
  const history = useHistory()
  function goUpload() {
    if (history.location.pathname === '/') {
      console.log('already in this route')
    } else {
      history.push('/')
    }
  }

  function goBank() {
    if (history.location.pathname === '/data') {
      console.log('already in this route')
    } else {
      history.push('/data')
    }
  }

  function goLog() {
    if (history.location.pathname === '/log') {
      console.log('already in this route')
    } else {
      history.push('/log')
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href='#/goUpload' onClick={goUpload}>Upload</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href='#/goBank' onClick={goBank}>Data Bank</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href='#/goLog' onClick={goLog}>Log</a>
          </li>
        </ul>
      </div>
      </nav>
    </div>
  )
}