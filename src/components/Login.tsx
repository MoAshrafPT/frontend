import React from "react"
import "./form.css"
import email from "../images/email.png"
import pass from "../images/password.png"
import { Link } from "react-router-dom";
import "../Validation"


function Login()
{
    return(
        <div className = "big-box">
           <form action="" className="form1">
           <div className="mb-3">
            <img src={email} alt=""/>
            <label htmlFor="email"><strong>  Email</strong></label>
               <div className="box">
               <input type="email" />
               </div>
           </div>
           <div className="mb-3">
           <img  src={pass} alt=""/>
               <label  htmlFor="password"><strong>Password</strong></label>
               <div className="box">
               <input type="password" name="Enter Password" />
               </div>
           </div>
        
           <button className="btn btn-success btn-highlight w-100">Log in</button>
           <p>Don't you have an account? </p>
           <Link to="/signup" className="btn btn-default border w-100 bg-light text-decoration-none">Sign Up</Link>
       </form>
       </div>           
    ) 
}

export default Login