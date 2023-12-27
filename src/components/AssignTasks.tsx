import { useEffect, useState } from "react";
import Slider from "./Slider";
import Toolbar from "./Toolbar";
import { log, table } from "console";
import Footer from "./Footer";
import { DropdownMenu, Table } from "react-bootstrap";
import DropdownAdminTeam from "./DropdownAdminTeam";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

type memberData = {
  Mid: number;
  nameM: string;
  Admin_Ssn: number;
  Position: string;
  Major: string;
  Team_Name: string;
};

type taskData = {
  DescriptionT: string,
  Project_id:number,
  start_dateT: string,
  End_date:string
}




  



export default function AssignTasks() {
  const navigate = useNavigate();

  if(localStorage.getItem('role') === 'member' || localStorage.getItem('role') === null ){
    navigate('/home');
  }
 const [selectedMember, setSelectedMember] = useState<number | null>(null);

const schema: ZodType<taskData> = z.object({
  DescriptionT: z.string().min(10),
  Project_id: z.number().gte(1),
  start_dateT: z.string().min(6),
  End_date: z.string().min(6)
  });
    
 const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<taskData>({ resolver: zodResolver(schema) });


const submitData = (data: taskData)=>{
  console.log(data);
  
  axios.post('http://localhost:8081/addtask',{descp:data.DescriptionT,mid:selectedMember,aid:localStorage.getItem("userId"),pid:data.Project_id,sdate:data.start_dateT,edate:data.End_date})
  .then(res=> {
  console.log(res)
    alert("task assigned");
    }
    )
    .catch(err => console.log(err)
    )
 }




  const [data, setData] = useState<memberData[]>([]);
  
 


  useEffect(() => {
    if(localStorage.getItem("role") === 'admin')
    fetch("http://localhost:8081/adminmembers/"+localStorage.getItem('userId'))
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));


      if(localStorage.getItem("role") === 'manager')
      fetch("http://localhost:8081/allmembers/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));


  }, []);
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>, memberId: number) => {
    setSelectedMember(memberId);
  };
  return (
    <div>
      <Toolbar />
      <div>
        <div className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-center w-30 px-3 rounded mb-3"
            style={{ backgroundColor: "white" }}
          >
            <h2>Your Assigned Members</h2>
          </div>
          
        </div>
        <div className="d-flex justify-content-center rounded">
          <Table
            striped="columns"
            bordered
            hover
            responsive
            className="w-100 rounded"
          >
            <thead className="rounded">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th style={{width:"20px"}}>Select</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {data.map((item) => (
                <tr key={item.Mid}>
                  <td>{item.Mid}</td>
                  <td>{item.nameM}</td>
                  <td><input
                    type="radio"
                    value={item.Mid}
                    checked={selectedMember === item.Mid}
                    onChange={(e) => handleRadioChange(e, item.Mid)}
                    style={{ height: "20px", margin: "0px", padding: "0px" }}
              /></td>
                </tr>
              ))}
            </tbody>
          </Table>


          
        </div>
        {(selectedMember) && 
        
        <div className="formContainer">
        <div className="big-box">
          <form action="" className="form1" onSubmit={handleSubmit(submitData)}>
            <div className="mb-3">
              
              <label htmlFor="name">
                <strong>Description</strong>
              </label>
              <div className="box">
                <textarea {...register("DescriptionT")}
                 
                 />
                {errors.DescriptionT && (
                  <span className="error-msg">{errors.DescriptionT.message}</span>
                )}
              </div>
            </div>
            <div className="mb-3">
              
              <label htmlFor="carid">
                <strong>Start Date</strong>
              </label>
              <div className="box">
                <input
                  type="date"
                  {...register("start_dateT")}
                  
                />
                {errors.start_dateT && (
                  <span className="error-msg">{errors.start_dateT.message}</span>
                )}
                
              </div>
            </div>

            <div className="mb-3">
              
              <label htmlFor="carid">
                <strong>End Date</strong>
              </label>
              <div className="box">
                <input
                  type="date"
                  {...register("End_date")}
                  
                />
                {errors.End_date && (
                  <span className="error-msg">{errors.End_date.message}</span>
                )}
                
              </div>
            </div>


            <div className="mb-3">
              
              <label htmlFor="carid">
                <strong>Project ID</strong>
              </label>
              <div className="box">
                <input
                  type="number"
                  {...register("Project_id",{valueAsNumber:true})}
                  
                />
                {errors.Project_id && (
                  <span className="error-msg">{errors.Project_id.message}</span>
                )}
                
              </div>
            </div>

            
  
            <input
              type="submit"
              value="Assign"
              className="btn btn-success btn-highlight mb-4 w-100"
            />
           
          </form>
        </div>
      
      </div> 

   }
      </div>
      <Footer />
    </div>
  );
}