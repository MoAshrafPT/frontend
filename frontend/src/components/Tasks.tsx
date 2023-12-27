import React, {useState, useContext, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { log } from "console";
import Toolbar from "./Toolbar";
import { Table } from 'react-bootstrap';
import Footer from "./Footer";
import DropdownTeam from "./DropdownTeam";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
export default function Tasks(){
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
type taskData = {
    Task_Number: number,
    DescriptionT: string,
    member_id:number,
    admin_id: number,
    Project_id: number,
    start_dateT: string,
    End_date: string
}

const [tasks,setTasks] = useState<taskData[]>([]);

const schema: ZodType<taskData> = z.object({
  Task_Number:z.number().gte(0),
  DescriptionT:z.string().min(5),
  member_id: z.number().gte(0),
  admin_id:z.number().gte(0),
  Project_id: z.number().gte(0),
  start_dateT: z.string().min(7),
  End_date: z.string().min(7),

});
const [requests,setRequests] = useState<taskData[]>([]);

const {
  register,
  handleSubmit,
} = useForm<taskData>({ resolver: zodResolver(schema) });

const submitData = (data: taskData)=>{
  axios.post('http://localhost:8081/addtasks',{task:data.Task_Number,DescriptionT:data.DescriptionT,member:data.member_id,admin:data.admin_id,Project_id:data.Project_id,start_dateT:data.start_dateT,End_date:data.End_date})
  .then(res=> {
      console.log(res)
      alert("task added!");
  }
  )
  .catch(err => console.log(err)
  )
}
if(localStorage.getItem('isAuthenticated') !=='true'){
  navigate('/login');
}
useEffect(()=>{
  fetch('http://localhost:8081/tasks')
  .then((res) => res.json())
  .then((data) => {
    setTasks(data);
  console.log(data);
})
.catch((err) => console.log(err));
});
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
    
    const handleDelete =  (item: taskData)=>{
      axios.delete(`http://localhost:8081/deletetask/?task=${item.Task_Number}`)
      .then((res) => {
          console.log(res)
          setRequests((prevRequests) => prevRequests.filter(request => request.Task_Number!==item.Task_Number));
      }
      )

      .catch(err => console.log(err)
      )
      window.location.reload()
  }

    

    return(
        <div>
            <Toolbar/>
            <div>
      <div className="d-flex justify-content-center">          
        <div className="d-flex justify-content-center w-30 px-3 rounded mb-3" style={{backgroundColor:'white'}} >
        {(tasks.length>0)?<h2>You have the following tasks</h2> : <h2>You have no tasks</h2>}
       
      </div>
      </div>
      {/* <div className="text-center">
          <Link to='/create' className="btn btn-success btn-highlight text-center ">Create+</Link>
        </div> */}
      <div className="d-flex justify-content-center rounded">
      <Table striped='columns' bordered hover responsive className="w-100 rounded">
        <thead className="rounded">
          <tr>
            <th>Task Number</th>
            <th>Description</th>
            {/* <th>Member ID</th> */}
            <th>Admin ID</th>
            <th>Project ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {tasks.map((item) => (
            <tr key={item.Task_Number}>
              <td>{item.Task_Number}</td>  
              <td>{item.DescriptionT}</td>
              {/* <td>{item.member_id}</td> */}
              <td>{item.admin_id}</td>
              <td>{item.Project_id}</td>
              <td>{item.start_dateT.slice(0,-14)}</td>
              <td>{item.End_date.slice(0,-14)}</td>
              <td ><input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                handleDelete(item);
              }} style={{height: "20px", margin: "0px", padding:"0px"}} type="checkbox" /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(localStorage.getItem("role")=== 'admin' || localStorage.getItem("role")=== 'manager') && 
          <div className='w-70 bg-success rounded p-3'>
          <form onSubmit={handleSubmit(submitData)}>
              <div className='d-flex justify-content-center  rounded text-warning'>
              <h2 > Add task</h2>
              </div>
              <div className='  form-group text-warning'>
                  <label htmlFor=''>Task Number</label>
                  <input type='number' {...register("Task_Number",{valueAsNumber: true})} className='form-control' placeholder='number of the task'
                  />
              </div>
              <div className='form-group text-warning'>
                  <label htmlFor=''>Task's Description</label>
                  <input type='text' {...register("DescriptionT")} placeholder='Describe the task' className='form-control'/>
              </div>
              <div className='form-group text-warning'>
                  <label htmlFor=''>Member_ID</label>
                  <input type='number'  {...register("member_id",{valueAsNumber: true})} placeholder='ID#' className='form-control'/>

              </div>
              <div className='form-group text-warning'>
                  <label htmlFor=''>Admin_ID</label>
                  <input type='number' {...register("admin_id",{valueAsNumber: true})} placeholder='ID#' className='form-control'/>

              </div>
              <div className='form-group text-warning'>
                  <label htmlFor=''>Project_ID</label>
                  <input type='number' {...register("Project_id",{valueAsNumber: true})} placeholder='ID#' className='form-control'/>
              </div>
              <div className='form-group text-warning'>
                  <label htmlFor=''>Start_Date</label>
                  <input type='date'  {...register("start_dateT")} className='form-control'/>
              </div>
              <div className='form-group text-warning'>
                  <label htmlFor=''>End_Date</label>
                  <input type='date'  {...register("End_date")}  className='form-control'/>
              </div>
              <input
           type="submit"
           value="Add Task"
           className="btn btn-success btn-highlight text-center"
         />
          </form>
      </div>
       }
      
    </div>
    </div>
    <Footer/>
       
        </div>

    )
}

