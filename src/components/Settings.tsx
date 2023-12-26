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




export default function Settings() {
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
       </div>
      <Footer />
    </div>
  );
}
