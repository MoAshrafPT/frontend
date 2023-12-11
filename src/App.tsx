import React from 'react';
import logo from './logo.svg';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import About from './components/About';
import Cars from './components/Cars';
import Members from './components/Members';
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
         <Route path='/cars' element={<Cars/>}></Route>
         <Route path='/members' element={<Members/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
