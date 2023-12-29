import { useEffect, useState } from "react";
import Slider from "./Slider";
import Toolbar from "./Toolbar";
import { log, table } from "console";
import Footer from "./Footer";
import { DropdownMenu, Table } from "react-bootstrap";
import DropdownTeam from "./DropdownTeam";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";
import BarChartComponent from "./BarChartTeam";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import BarChartTeam from "./BarChartTeam";
import BarChartPrice from "./BarChartPrice";
import BarChartFunds from "./BarChartFunds";
import BarChartProjects from "./BarChartProjects";
ChartJS.register(...registerables);





export default function Settings() {

type Projects = {
  Pid : number,
  PName: string
}  

type citationData = {
  Admin_id: number,
  Member_id:number,
  Reason: string,
  Action:string,
  severity: number,
  reportDate:string

} 
type changedPassword = {
    password:string,
    confirmPassword:string
}
type changedEmail = {
    email:string
}
type changedMajor = {
    major:string
}
const emailSchema: ZodType<changedEmail> =z.object({
    email: z.string().email()
})
const passwordSchema: ZodType<changedPassword> =z.object({
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20)
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
const majorSchema: ZodType<changedMajor> =z.object({
    major: z.string().min(3).max(20)
})

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changedEmail>({ resolver: zodResolver(emailSchema) });
const {
    register: registerP,
    handleSubmit :handleSubmitP,
    formState: { errors: passErrors },
  } = useForm<changedPassword>({ resolver: zodResolver(passwordSchema) });

const {
    register: registerR,
    handleSubmit :handleSubmitR,
    formState: { errors: majorErrors },
  } = useForm<changedMajor>({ resolver: zodResolver(majorSchema) });

const handleEmailChange = (data: changedEmail)=>{
 axios.patch(`http://localhost:8081/changeemail/${localStorage.getItem('userId')}`,{email:data.email})
 .then(res=> {console.log(res)
    alert("email changed successfully")
})
 .catch(err=>console.log(err))
  alert("email changed successfully")
}

const handlePasswordChange = (data: changedPassword)=>{
    axios.patch(`http://localhost:8081/changepassword/${localStorage.getItem('userId')}`,{password:data.password})
    .then(res=> {console.log(res)
        alert("password changed successfully")
    })
    .catch(err=>console.log(err))
    
}
const handleMajorChange = (data: changedMajor)=>{
    axios.patch(`http://localhost:8081/changemajor/${localStorage.getItem('userId')}`,{major:data.major})
    .then(res=> {console.log(res)
        alert("major changed successfully")
    })
    .catch(err=>console.log(err))
}


const [taskCount,setTaskCount] = useState<number>(0);
const [projectCount,setProjectCount] = useState<number>(0);
const [totalSeverity,setTotalSeverity] = useState<number>(0);
const [totalMembers,setTotalMembers] = useState<number>(0);
const [actionsIssued,setActionsIssued] = useState<number>(0);
const [maxPrize,setMaxPrize] = useState<any>(null);
const [citations,setCitations] = useState<citationData[]>([])
const [projects,setProjects] = useState<Projects[]>([]);
  useEffect(() => {
    //fetches related to all users
    fetch(`http://localhost:8081/projectcount/${localStorage.getItem('userId')}`)
      .then((res) => res.json())
      .then((data) => {
        setProjectCount(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://localhost:8081/taskcount/${localStorage.getItem('userId')}`)
      .then((res) => res.json())
      .then((data) => {
        setTaskCount(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://localhost:8081/severitysum/${localStorage.getItem('userId')}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalSeverity(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

      fetch(`http://localhost:8081/getmaxawards`)
      .then((res) => res.json())
      .then((data) => {
        setMaxPrize(data[0]['Max(Prize)']);
        console.log(data);
      })
      .catch((err) => console.log(err));


      //Admin level fetches
      if(localStorage.getItem('role') === 'admin'){
        fetch(`http://localhost:8081/totalmembers/${localStorage.getItem('userId')}`)
        .then((res) => res.json())
        .then((data) => {
        setTotalMembers(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
      
      fetch(`http://localhost:8081/totalseveritiesissued/${localStorage.getItem('userId')}`)
        .then((res) => res.json())
        .then((data) => {
        setActionsIssued(data);
        console.log(data);
      })
      .catch((err) => console.log(err)); 
      }
      fetch(`http://localhost:8081/citations/${localStorage.getItem("userId")}`)
      .then((res) => res.json())
      .then((data) => {
      setCitations(data);
      console.log(data);
    })
    .catch((err) => console.log(err));
    
    fetch("http://localhost:8081/totalprojects")
    .then((res)=>res.json())
    .then((data) => {
      setProjects(data);
      console.log(data);
    })
      
      
  }, []);

  return (
    <div>
      <Toolbar />
       <div className="display-flex justify-content-center bg-secondary" style={{marginBottom: "50px"}}>
            <h2 >Update User Data</h2>
            <section style={{backgroundColor: 'white',padding:'10px'}}>

                <form action="" onSubmit={handleSubmit(handleEmailChange)}>
                    <label htmlFor="" className="display-block">Change Email</label>
                    <div className="box">
                    <input type="text" {...register("email")}style={{color: 'black'}} />
                    {errors.email && (
                    <span className="error-msg">{errors.email.message}</span>
                    )}
                    </div>
                    <input type="submit" value= "update" className="btn  border bg-success text-decoration-none" style={{width:'70px', margin: '3px',color:"white"}} />
                </form>

                <form action="" onSubmit={handleSubmitP(handlePasswordChange)}>
                    <label htmlFor="" className="display-block">Change Password</label>
                    <div className="box">
                    <input type="password" {...registerP("password")} style={{color: 'black'}} />
                    {passErrors.password && (
                    <span className="error-msg">{passErrors.password.message}</span>
                    )}
                    </div>
                    <label htmlFor="" className="display-block">Confirm Password</label>
                    {passErrors.confirmPassword && (
                    <span className="error-msg">{passErrors.confirmPassword.message}</span>
                    )}
                    <div className="box">
                    <input type="password" {...registerP("confirmPassword")} style={{color: 'black'}} />
                    </div>
                    <input type="submit" value= "update" className="btn  border bg-success text-decoration-none" style={{width:'70px', margin: '3px',color:"white"}} />
                </form>

                <form action="" onSubmit={handleSubmitR(handleMajorChange)}>

                    <label htmlFor="" className="display-block">Update Major</label>
                    <div className="box">
                    <input type="text" {...registerR("major")} style={{color: 'black'}} />
                    {majorErrors.major && (
                    <span className="error-msg">{majorErrors.major.message}</span>
                    )}
                    </div>
                    <input type="submit" value= "update" className="btn  border bg-success text-decoration-none" style={{width:'70px', margin: '3px',color:"white"}} />
                </form>
            </section>
            {(localStorage.getItem("role") !== 'sponsor') &&
            <div>
            <h2>User statistics</h2>
            <section style={{backgroundColor: 'white',padding:'10px'}}>
                <p>
                    Total Tasks: {taskCount}
                </p>
                <p>
                    Total Projects: {projectCount}
                </p>
                <p>
                    Total Severities: {!totalSeverity && 0} {totalSeverity}
                </p>
                
            </section></div> }
            <h2>All Projects</h2>
            <section style={{backgroundColor: 'white',padding:'10px'}}>
            <Table
            striped="columns"
            bordered
            hover
            responsive
            className="w-100 rounded"
          >
            <thead className="rounded">
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {projects.map((item,i) => (
                <tr key={i}>
                  <td>{item.Pid}</td>
                  <td>{item.PName}</td>
            
                </tr>
              ))}
            </tbody>
          </Table>    
            </section>
            {(localStorage.getItem('role')=== 'admin' || localStorage.getItem('role')=== 'manager') &&
                <div>
                <h2>Administrative Statistics</h2>
                <section style={{backgroundColor: 'white',padding:'10px'}}>
                    <p>
                        Total members supervised: {totalMembers}
                    </p>
                    <p>
                        Total disciplinary actions issued: {actionsIssued}
                    </p>
                    
                </section>



                
                </div>
            }

            {(localStorage.getItem('role')=== 'member') &&
                <div>
                <h2>Your Citations</h2>
                <section style={{backgroundColor: 'white',padding:'10px'}}>
                  
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
                <th>Admin ID</th>
                <th>Reason</th>
                <th>Action</th>
                <th>Severity</th>
                <th>Date of Report</th>
                
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {citations.map((item,i) => (
                <tr key={i}>
                  <td>{item.Admin_id}</td>
                  <td>{item.Reason}</td>
                  <td>{item.Action}</td>
                  <td>{item.severity}</td>
                  <td>{item.reportDate.slice(0, -14)}</td> 
                </tr>
              ))}
            </tbody>
          </Table> 
         
        </div>
                </section>
               

                </div>
            }
            <h2>Global Statistics</h2>
                <section style={{background:"white"}}>
                  <h2>Maximum Prize Money: {maxPrize} EGP</h2>
                  <BarChartTeam/>
                  <BarChartPrice/>
                 <BarChartFunds/>
                 <BarChartProjects/>
                </section>
       </div>
      <Footer />
    </div>
  );
}
