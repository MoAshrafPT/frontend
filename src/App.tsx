import React from 'react';
import logo from './logo.svg';
import Login from './components/Login';
import Signup from './Signup';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Routes , Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/signup' element={<Signup/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/home' element={<Home/>}></Route>
         <Route path='/about' element={<About/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
