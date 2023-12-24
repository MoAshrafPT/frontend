import React from "react";
import { useEffect, useState, useContext } from "react";
import "./form.css";
import email from "../images/email.png";
import pass from "../images/password.png";
import { Link, redirect } from "react-router-dom";
import { ZodType, z } from "zod";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // Import useHistory
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Nav } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import Footer from "./Footer";



function Login() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoggedIn, setLoginStatus] = useState<boolean>(false);
  const [enteredWrongPassword, setPasswordCheck] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [member,setMember]= useState<string>('');


  type FormData = {
    email: string;
    password: string;
  };
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  
  const submitData = (data: FormData) => {
    
    axios.post('http://localhost:8081/login', {email: data.email, password:data.password})
    .then((res) =>
     {setLoginStatus(res.data.data)
      console.log(res.data,data);
      
      userContext.setUser({email:data.email,name:res.data.row,id:res.data.id,isAuthenticated:true});
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("username",res.data.row);
      localStorage.setItem("email",data.email);
      localStorage.setItem("role",res.data.role);
      localStorage.setItem("isAuthenticated",'true');
      console.log(localStorage.getItem('role'),'getting role');
      
      
      if(!isLoggedIn)
      {
       
        setPasswordCheck(true); //indicates user has entered password incorrectly
      }
    })
    .catch(err => console.log(err));
  };

 

  useEffect(()=>{
    if(isLoggedIn)
 {
    localStorage.setItem("AuthToken",'AUTH123')
    navigate('/home');
 }  
 })

  return (
    <div className="formContainer">
      <div className="big-box">
        <form action="" className="form1" onSubmit={handleSubmit(submitData)}>
          <div className="mb-3">
            <img src={email} alt="" />
            <label htmlFor="email">
              <strong> Email</strong>
            </label>
            <div className="box">
              <input type="email" {...register("email")}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
               />
              {errors.email && (
                <span className="error-msg">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <img src={pass} alt="" />
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <div className="box">
              <input
                type="password"
                {...register("password")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password && (
                <span className="error-msg">{errors.password.message}</span>
              )}
               {enteredWrongPassword && (
                <span className="error-msg">password is incorrect</span>
              )}
            </div>
          </div>

          <input
            type="submit"
            value="Log in"
            className="btn btn-success btn-highlight  w-100"
          />
          <p>Don't you have an account? </p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light text-decoration-none"
          >
            Sign Up
          </Link>

          <Link
            to="/home"
            className="btn btn-default border w-100 bg-secondary text-decoration-none"
          >
            Continue as guest
          </Link>
        </form>
      </div>
      
    </div>

  );
}

export default Login;
