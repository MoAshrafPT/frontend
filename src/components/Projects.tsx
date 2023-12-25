import React, { useContext, useEffect ,useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";



export default function Projects(){
 const navigate = useNavigate();

    if(localStorage.getItem('isAuthenticated') !=='true')
        navigate('/login');
   
    type projectData = {
        Pid: number,
        PName: string,
        Mid: number,
        admin_id: number
    }
   

    const [projects,setProjects] = useState<projectData[]>([]);

    useEffect(()=>{
        fetch(`http://localhost:8081/projects/${localStorage.getItem('userId')}`)
        .then(res=> res.json())
        .then(data=>{setProjects(data); console.log(data);
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
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Manager ID</th>
            <th>Admin ID</th>
           
           
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {projects.map((item) => (
            <tr key={item.Pid}> 
              <td>{item.Pid}</td>
              <td>{item.PName}</td>
              <td>{item.Mid}</td>
              <td>{item.admin_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      
   
      </div></div> 

            <Footer/>
        </div>
    )
}