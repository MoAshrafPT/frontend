import React, { useContext, useEffect ,useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";



export default function AllRequests(){
 const navigate = useNavigate();
    if(localStorage.getItem('isAuthenticated') !=='true')
        navigate('/login');
   
    type requestData = {
        memberID: number,
        toolname: string,
        quantity: number,
        deadline: string
    }

    const [requests,setRequests] = useState<requestData[]>([]);

    useEffect(()=>{
        fetch('http://localhost:8081/allrequests/')
        .then(res=> res.json())
        .then(data=>{setRequests(data); console.log(data);
        })
        .catch(err=>console.log(err));
    },[])

    




    return(
        <div>
            <Toolbar/>

            <div className="d-flex justify-content-center">
            <div className="d-block  rounded">
            <Table striped='columns' bordered hover responsive className="w-100 rounded">
        <thead className="rounded">
          <tr>
            <th>Member ID</th>
            <th>Tool Name</th>
            <th>Quantity</th>
            <th>Request Deadline</th>
            <th style={{width:"20px"}}>Mark as done</th>
           
           
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {requests.map((item) => (
            <tr key={item.memberID}> 
              <td>{item.memberID}</td>
              <td>{item.toolname}</td>
              <td>{item.quantity}</td>
              <td>{item.deadline.slice(0,-14)}</td>
              <td ><form action="" method="POST"><input style={{height: "20px", margin: "0px", padding:"0px"}} type="checkbox" /></form></td>
            </tr>
          ))}
        </tbody>
      </Table>

      
   
      </div></div> 

            <Footer/>
        </div>
    )
}