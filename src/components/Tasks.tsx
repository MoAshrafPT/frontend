import React, {useState, useContext, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { log } from "console";
import Toolbar from "./Toolbar";
import { Table } from 'react-bootstrap';
import Footer from "./Footer";
import DropdownTeam from "./DropdownTeam";
type taskData = {
    Task_Number: number,
    DescriptionT: string,
    admin_id: number,
    Project_id: number,
    start_dateT: string,
    End_date: string
}

export default function Tasks(){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    const [tasks,setTasks] = useState<taskData[]>([]);


        
     if(localStorage.getItem('isAuthenticated') !=='true'){
            navigate('/login');
        }

    //make a request to retrieve member tasks
    useEffect(()=>{
        console.log('using Tasks route');
        
        axios.post('http://localhost:8081/tasks',{memberID:userContext.user.id})
        .then((res)=>{
            console.log(res);
            setTasks(res.data);
        })
        .catch((err)=> console.log(err)
        )
    },[]);
    

    

    return(
        <div>
            <Toolbar/>
            <div>
      <div className="d-flex justify-content-center">          
        <div className="d-flex justify-content-center w-30 px-3 rounded mb-3" style={{backgroundColor:'white'}} >
        {(tasks.length>0)?<h2>You have the following tasks</h2> : <h2>You have no tasks</h2>}
      </div>
      </div>
      
      <div className="d-flex justify-content-center rounded">
      <Table striped='columns' bordered hover responsive className="w-100 rounded">
        <thead className="rounded">
          <tr>
            <th>Task Number</th>
            <th>Description</th>
            <th>Admin ID</th>
            <th>Project ID</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {tasks.map((item) => (
            <tr key={item.Task_Number}>
              <td>{item.Task_Number}</td>  
              <td>{item.DescriptionT}</td>
              <td>{item.admin_id}</td>
              <td>{item.Project_id}</td>
              <td>{item.start_dateT.slice(0,-14)}</td>
              <td>{item.End_date.slice(0,-14)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      
      
    </div>
    <Footer/>
        </div>
    )
}

