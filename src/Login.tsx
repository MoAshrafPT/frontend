import React from "react";
import { Link } from "react-router-dom";
import "./form.css"
import "./Validation"
function Login()
{
    return(
    <div className="d-flex justify-content-center align-items-center  vh-100" style={{background: '#93e4c1'}}>
        <div className = 'bg-white p-3 rounded formscreen w-50' style={{maxWidth: '500px'}}>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="email"><strong> Email</strong></label>
                    <input type="email" name="Enter Email" className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" name="Enter Password" className="form-control rounded-0" />
                </div>
                <button className="btn btn-success btn-highlight w-100">Log in</button>
                <p>You agree to our terms & policies</p>
                <Link to="/signup" className="btn btn-default border w-100 bg-light text-decoration-none">Create Account</Link>
            </form>
        </div>
    </div>
    ) 
}

export default Login