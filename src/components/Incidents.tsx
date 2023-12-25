import React, {useState, useContext, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { log } from "console";
import Toolbar from "./Toolbar";
import { Table } from 'react-bootstrap';
import Footer from "./Footer";
import DropdownTeam from "./DropdownTeam";
type incidentData = {
    Cause: string,
    Damaged_Part: string,
    Fixing_Time: number,
    DateR: string
}

export default function Incidents(){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    const [incidents,setIncidents] = useState<incidentData[]>([]);


        
     if(localStorage.getItem('isAuthenticated') !=='true'){
            navigate('/login');
        }

    //make a request to retrieve member tasks
    useEffect(()=>{
        console.log('using Incidents route');
        
        axios.get('http://localhost:8081/incidents')
        .then((res)=>{
            console.log(res);
            setIncidents(res.data);
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
        {(incidents.length>0)?<h2>Here are the recent incidents</h2> : <h2>There are no recent incidents</h2>}
      </div>
      </div>
      
      <div className="d-flex justify-content-center rounded">
      <Table striped='columns' bordered hover responsive className="w-100 rounded">
        <thead className="rounded">
          <tr>
            <th>Cause</th>
            <th>Damaged Part</th>
            <th>Fixing Time</th>
            <th>Date</th>
        
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {incidents.map((item,i) => (
            <tr key={i}>
              <td>{item.Cause}</td>  
              <td>{item.Damaged_Part}</td>
              <td>{item.Fixing_Time}</td>
              <td>{item.DateR.slice(0,-14)}</td>
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

