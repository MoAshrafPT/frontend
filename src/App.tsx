import React from "react";
import logo from "./logo.svg";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import Cars from "./components/Cars";
import Members from "./components/Members";
import Sponsors from "./components/Sponsors";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserContextProvider } from "./context/UserContext";
import PrivateRoutes from "./components/utils/PrivateRoute";
import Tasks from "./components/Tasks";

//TODO: make login data synced to entire app

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>

          <Route path="/cars" element={<Cars />}></Route>
          <Route path="/members" element={<Members />}></Route>
          <Route path="/sponsors" element={<Sponsors />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
