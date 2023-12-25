import React from 'react';
import logo from './logo.svg';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import About from './components/About';
import Cars from './components/Cars';
import Members from './components/Members';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, UserContextProvider } from './context/UserContext';
import PrivateRoutes from './components/utils/PrivateRoute';
import Tasks from './components/Tasks';
import Tools from './components/Tools';
import Requests from './components/Requests';
import AllRequests from './components/AllRequests';
import Sponsors from './components/Sponsors';
import Races from './components/Races';
import Projects from './components/Projects';
import TasksAdmin from './components/TasksAdmin';
import Incidents from './components/Incidents';
import Alumni from './components/Alumni';





function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/signup' element={<Signup/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/home' element={<Home />}></Route>
         <Route path='/about' element={<About />}></Route>
         <Route path='/tasks' element={<Tasks/>}></Route>
         <Route path='/tools' element={<Tools/>}></Route>
         <Route path='/cars' element={<Cars />}></Route>
         <Route path='/sponsors' element={<Sponsors />}></Route>
         <Route path='/myrequests' element={<Requests />}></Route>
         <Route path='/races' element={<Races />}></Route>
         <Route path='/projects' element={<Projects />}></Route>
         <Route path='/taskadmin' element={<TasksAdmin />}></Route>
         <Route path='/incidents' element={<Incidents />}></Route>
         <Route path='/allrequests' element={<AllRequests />}></Route>
         <Route path='/alumni' element={<Alumni />}></Route>
         <Route path='/members' element={<Members/>}></Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
