import React from "react";
import { useEffect, useState } from "react";
import "./form.css";
import email from "../images/email.png";
import pass from "../images/password.png";
import { Link } from "react-router-dom";
import { ZodType, z } from "zod";
//import {FormData} from "./types"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  //Not sure of this but will leave this for now
  const [isLoggedIn, setLoginStatus] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8081/login")
      .then((res) => res.json())
      .then((isLoggedIn) => setLoginStatus(isLoggedIn))
      .catch((err) => console.log(err));
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    console.log("Data:", data);
  };

  useEffect(() => {
    console.log(password);
    console.log(username);
    
  });

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
        </form>
      </div>
    </div>
  );
}

export default Login;
