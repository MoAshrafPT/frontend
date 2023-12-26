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

type disciplinaryData = {
  reason: string,
  action: string,
  severity: number
}




  



export default function DisciplinaryAction() {
  const navigate = useNavigate();

  if(localStorage.getItem("role") !== 'admin'){
    navigate('/home');
  }
 const [selectedMember, setSelectedMember] = useState<number | null>(null);

const schema: ZodType<disciplinaryData> = z.object({
  reason: z.string().min(3),
  action: z.string().min(3),
  severity: z.number().gte(1).lte(5)
  });
    
 const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<disciplinaryData>({ resolver: zodResolver(schema) });


const submitData = (data: disciplinaryData)=>{
  console.log(data);
  
  axios.post('http://localhost:8081/discipline',{admin:localStorage.getItem("userId"),member:selectedMember,reason:data.reason,action:data.action,severity:data.severity})
  .then(res=> {
  console.log(res)
    alert("member reported");
    }
    )
    .catch(err => console.log(err)
    )
    }




  const [data, setData] = useState<memberData[]>([]);
  const [teamName, setTeamName] = useState<string>("All");
 


  useEffect(() => {
    fetch("http://localhost:8081/discipmember/" + teamName + "")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [teamName]);
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
            <h2>{teamName} Members</h2>
          </div>
          <DropdownAdminTeam path={teamName} setPath={setTeamName} />
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
                <strong>Reason</strong>
              </label>
              <div className="box">
                <input type="text" {...register("reason")}
                 
                 />
                {errors.reason && (
                  <span className="error-msg">{errors.reason.message}</span>
                )}
              </div>
            </div>
            <div className="mb-3">
              
              <label htmlFor="carid">
                <strong>Action</strong>
              </label>
              <div className="box">
                <input
                  type="text"
                  {...register("action")}
                  
                />
                {errors.action && (
                  <span className="error-msg">{errors.action.message}</span>
                )}
                
              </div>
            </div>

            <div className="mb-3">
              
              <label htmlFor="carid">
                <strong>Severity</strong>
              </label>
              <div className="box">
                <input
                  type="number"
                  {...register("severity",{valueAsNumber: true})}
                  
                />
                {errors.severity && (
                  <span className="error-msg">{errors.severity.message}</span>
                )}
                
              </div>
            </div>

            
  
            <input
              type="submit"
              value="Report Member"
              className="btn btn-warning btn-highlight mb-4 w-100"
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