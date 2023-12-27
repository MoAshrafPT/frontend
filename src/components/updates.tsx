import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
type updatesData = {
  member_id: number;
  admin_id: number;
  update: string;
};
export function updates() {
  const [updates, setUpdates] = useState<updatesData[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  };


  const submitData = (data: updatesData) => {
    axios
      .post("http://localhost:8081/updates", {
        member_id: data.member_id,
        admin_id: data.admin_id,
        update: data.update,
      })
      .then((res) => {
        console.log(res);
        alert("Update Sent!");
      })
      .catch((err) => console.log(err));
  };
  return(
    <div>
        <Toolbar/>

  {(localStorage.getItem("role")=== 'member') && 
    
    
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
