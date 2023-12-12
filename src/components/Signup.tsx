import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import person from "../images/person.png"
import phone from "../images/icons8-phone-30.png"
import graduation from"../images/icons8-graduation-30.png"
import email from "../images/email.png"
import pass1 from "../images/password.png"
import pass2 from "../images/icons8-password-30.png"
import {ZodType, z} from "zod"
import {FormData} from "./types"
import { set, useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import axios from "axios";


function Signup()
{
  //allows for navigation through child component
  const navigate = useNavigate();
    
  const phoneRegex = new RegExp('@"^(01)\d{9}$"'); //check for format 01XXXXXXXX
  const currentYear = new Date().getFullYear(); //get year to check maximum allowed time for member to stay

    //States for sign up user data and sign up status
    const [isSignedUp, setSignUpStatus] = useState<boolean>(false);

    //-----------Form Data--------------------------------------------//
    const[emailInUse,setInUse]= useState<boolean>(false);
    const [name,setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [major,setMajor] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [gradYear,setGradYear] = useState(currentYear+5);
    //----------------------------------------------------------------//

  
    

    //Data validation schema for form entry
    const schema: ZodType<FormData> = z.object({
        
        name:z.string().min(6).max(30),
        email: z.string().email(),
        phoneNumber:z.string().min(11).max(11),//.regex(phoneRegex, 'Invalid Phone Number'),
        major:z.string().min(2).max(10),
        password: z.string().min(8).max(20),
        confirmPassword: z.string().min(8).max(20),
        gradYear: z.number().min(currentYear).max(currentYear+5)
    }).refine((data)=> data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    //handle submisson
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)});
    const submitData = (data: FormData)=>{
        console.log("Data:",data)
        const submissionData = {
            name:data.name,
            email: data.email,
            major:data.major,
            password:data.password,
            phoneNumber: data.phoneNumber,
            gradYear:data.gradYear

        }

        axios.post('http://localhost:8081/signup', submissionData)
        .then(res => {
            setSignUpStatus(res.data);
            if(!isSignedUp) setInUse(true);
        })
        .catch(err => console.log("Error"));
    }

    useEffect(()=>{
        if(isSignedUp)
        {
            navigate('/login');
        }
    })

    return(
        <div className="formContainer">
        <div className = "big-box" >
            <form action="" onSubmit={handleSubmit(submitData)}>
                <div className="mb-3">
                    <div>
                        <img src={person}/>
                        <label htmlFor="name"><strong> Name</strong></label>
                    </div>
                    <input type="text"  {...register("name")} />
                    {errors.name && <span className="error-msg">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                    <div>
                        <img src={phone}/>
                        <label htmlFor="name"><strong> Phone Number </strong></label>
                    </div>
                    <input type="text" {...register("phoneNumber")}  />
                    {errors.phoneNumber && <span className="error-msg">{errors.phoneNumber.message}</span>}
                </div>
                <div className="mb-3">
                <img src={graduation}/>
                    <div>
                        <label htmlFor="name"><strong>Year of Gradutaion</strong></label>
                    </div>
                    <input type="number" {...register("gradYear",{valueAsNumber: true})}/>
                    {errors.gradYear && <span className="error-msg">{errors.gradYear.message}</span>}
                </div>
                <div className="mb-3">
                <img src={graduation}/>
                    <div>
                        <label htmlFor="name"><strong>Major</strong></label>
                    </div>
                    <input type="text" {...register("major")}/>
                    {errors.major && <span className="error-msg">{errors.major.message}</span>}
                </div>
                <div className="mb-3">
                <img src={email}/>
                    <div>
                         <label htmlFor="email"><strong> Email</strong></label>
                    </div>
                    <input type="email" {...register("email")} />
                    {errors.email && <span className="error-msg">{errors.email.message}</span>}
                    {emailInUse && <span className="error-msg">Email already in use</span>} 
                    </div>
                <div className="mb-3">
                <img src={pass1}/>
                    <div>
                         <label htmlFor="password"><strong>Password</strong></label>
                    </div>
                    <input type="password" {...register("password")} />
                    {errors.password && <span className="error-msg">{errors.password.message}</span>}
                </div>
                <div className="mb-3">
                <img src={pass2}/>
                    <div>
                        <label htmlFor="password"><strong>Confirm Password</strong></label>
                    </div>
                    <input type="password" {...register("confirmPassword")} />
                    {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
                </div>
                
                <input type="submit" value='Sign Up' className="btn btn-success btn-highlight  w-100"/>
                <p>Already have an account?</p>
                <Link to='/login'  className="btn btn-default border w-100 bg-light text-decoration-none">Log in</Link>
            </form>
        </div>
        </div>
    );
}
export default Signup