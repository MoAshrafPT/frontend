import React from "react";
import {Link} from "react-router-dom"


export default function Navbar()
{
    return(
    <nav className="navbar navbar-expand-lg navbar-dark formscreen" style={{backgroundColor: '#1f6f78'}}>
      <div className="container">
        <a className="navbar-brand" href="#">Eco Racing Team</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Cars</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="https://www.youtube.com/watch?v=xvFZjo5PgG0" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
              <div className="dropdown-menu" aria-labelledby="dropdown07">
                <Link to='/signup' className="dropdown-item">Become a member</Link>
                <Link to='/login' className="dropdown-item" >Login</Link>
                <Link to='/login' className="dropdown-item">Report an issue</Link>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-md-0">
            <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
          </form>
        </div>
      </div>
    </nav>)
}