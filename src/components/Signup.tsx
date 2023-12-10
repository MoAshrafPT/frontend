import React from "react";
import {Link} from "react-router-dom"
import person from "../images/person.png"
import phone from "../images/icons8-phone-30.png"
import graduation from"../images/icons8-graduation-30.png"
import email from "../images/email.png"
import pass1 from "../images/password.png"
import pass2 from "../images/icons8-password-30.png"
import {ZodType, z} from "zod"
import {FormData} from "./types"
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'


function Signup()
{
    
    const phoneRegex = new RegExp('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$');
    const currentYear = new Date().getFullYear();
    const schema: ZodType<FormData> = z.object({
        
        name:z.string().min(6).max(30),
        email: z.string().email(),
        phoneNumber:z.string().min(11).max(11),//.regex(phoneRegex, 'Invalid Phone Number'),
        password: z.string().min(8).max(20),
        confirmPassword: z.string().min(8).max(20),
        gradYear: z.number().min(currentYear).max(currentYear+5)
    }).refine((data)=> data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)});
    const submitData = (data: FormData)=>{
        console.log("Data:",data)
    }

    return(
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
                <img src={email}/>
                    <div>
                         <label htmlFor="email"><strong> Email</strong></label>
                    </div>
                    <input type="email" {...register("email")} />
                    {errors.email && <span className="error-msg">{errors.email.message}</span>}             </div>
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
    );
}
export default Signup