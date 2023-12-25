import React, {useState, useContext, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { log } from "console";
import Toolbar from "./Toolbar";
import { Table } from 'react-bootstrap';
import Footer from "./Footer";
import DropdownTeam from "./DropdownTeam";
type alumniData = {
  Aid: number,
  Car_id:number,
  nameA:string,
  Email:string,
  Graduation_date:string
}

export default function Alumni(){
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    const [alumni,setAlumni] = useState<alumniData[]>([]);




    //make a request to retrieve member tasks
    useEffect(()=>{
        console.log('using Alumni route');
        
        axios.get('http://localhost:8081/alumni')
        .then((res)=>{
            console.log(res);
            setAlumni(res.data);
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
        {(alumni.length>0)?<h2>Our Alumni</h2> : <h2>There are no alumni</h2>}
      </div>
      </div>
      
      <div className="d-flex justify-content-center rounded">
      <Table striped='columns' bordered hover responsive className="w-100 rounded">
        <thead className="rounded">
          <tr>
            <th>ID</th>
            <th>Affiliated Car ID</th>
            <th>Name</th>
            <th>Graduation Date</th>
        
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {alumni.map((item,i) => (
            <tr key={i}>
              <td>{item.Aid}</td>  
              <td>{item.Car_id}</td>
              <td>{item.nameA}</td>
              <td>{item.Graduation_date.slice(0,-14)}</td>
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

