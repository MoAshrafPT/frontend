import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar";
import { Carousel, Table } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";


export default function Races(){

    

    type raceData = {
        DateR: string,
        Distance: number,
        Car_id: number,
        LocationR: string,
        member_id : number
    }
    const [races,setRaces] = useState<raceData[]>([]);

  
      const schema: ZodType<raceData> = z.object({
        DateR: z.string().min(7),
        Distance: z.number().gte(10),
        Car_id: z.number().gte(1),
        LocationR:z.string().min(3),
        member_id: z.number().gte(1)
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<raceData>({ resolver: zodResolver(schema) });

      const submitData = (data: raceData)=>{
        axios.post('http://localhost:8081/addrace',{date:data.DateR,distance:data.Distance,location:data.LocationR,car:data.Car_id,member:data.member_id})
        .then(res=> {
            console.log(res)
            alert("Race inserted!");
        }
        )
        .catch(err => console.log(err)
        )
      }


    useEffect(()=>{
        fetch('http://localhost:8081/races/')
        .then((res) => res.json())
        .then((data) => {
        setRaces(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
    })

    return(
        <div>
            <Toolbar/>
            <div className="d-flex justify-content-center">
            <div className="d-block  rounded">
            <Table striped='columns' bordered hover responsive className="w-100 rounded">
        <thead className="rounded">
          <tr>
            <th>Date</th>
            <th>Distance</th>
            <th>Car ID</th>
            <th>Location</th>
            <th>Member ID</th>
           
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {races.map((item) => (
            <tr key={item.DateR}>
              <td>{item.DateR.slice(0,-14)}</td> 
              <td>{item.Distance}</td>  
              <td>{item.Car_id}</td>
              <td>{item.LocationR}</td>
              <td>{item.member_id}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>

      {(localStorage.getItem("role")=== 'admin' || localStorage.getItem("role")=== 'manager') && 
        
           <div className="formContainer">
           <div className="big-box">
             <form action="" className="form1" onSubmit={handleSubmit(submitData)}>
               <div className="mb-3">
                 
                 <label htmlFor="name">
                   <strong>Distance</strong>
                 </label>
                 <div className="box">
                   <input type="number" {...register("Distance",{valueAsNumber: true})}
                    
                    />
                   {errors.Distance && (
                     <span className="error-msg">{errors.Distance.message}</span>
                   )}
                 </div>
               </div>
               <div className="mb-3">
                 
                 <label htmlFor="carid">
                   <strong>Car ID</strong>
                 </label>
                 <div className="box">
                   <input
                     type="number"
                     {...register("Car_id",{valueAsNumber: true})}
                     
                   />
                   {errors.Car_id && (
                     <span className="error-msg">{errors.Car_id.message}</span>
                   )}
                   
                 </div>
               </div>

               <div className="mb-3">
                 
                 <label htmlFor="carid">
                   <strong>Member ID</strong>
                 </label>
                 <div className="box">
                   <input
                     type="number"
                     {...register("member_id",{valueAsNumber: true})}
                     
                   />
                   {errors.member_id && (
                     <span className="error-msg">{errors.member_id.message}</span>
                   )}
                   
                 </div>
               </div>

               <div className="mb-3">
                 
                 <label htmlFor="name">
                   <strong>Location</strong>
                 </label>
                 <div className="box">
                   <input type="text" {...register("LocationR")}
                   
                    />
                   {errors.LocationR && (
                     <span className="error-msg">Field Required!</span>
                   )}
                 </div>
               </div>
     
               <div className="mb-3">
                 
                 <label htmlFor="name">
                   <strong>Race Date</strong>
                 </label>
                 <div className="box">
                   <input type="date" {...register("DateR")}
                   
                    />
                   {errors.DateR && (
                     <span className="error-msg">Date required!</span>
                   )}
                 </div>
               </div>
     
               <input
                 type="submit"
                 value="Add new race"
                 className="btn btn-success btn-highlight mb-4 w-100"
               />
              
             </form>
           </div>
          <Link to="/incidents"> <button className="btn btn-danger btn-highlight mt-4 w-100">Check Race Incidents</button></Link>
         </div> 

      }

      </div>
      </div>

            <Footer/>
        </div>
    )
}