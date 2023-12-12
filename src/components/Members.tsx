import { useEffect, useState } from "react"
import Slider from "./Slider"
import Toolbar from "./Toolbar"
import { log } from "console"

type memberData ={
    Mid: number,
    nameM: string,
    Admin_ssn: number,
    Position: string,
    Major: string

}

export default function Members(props: {state:string})
{
    const [data,setData] = useState<memberData[]>([]);

    useEffect(()=>{
        fetch('http://localhost:8081/members')
        .then(res=> res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
    },[]);


    return(
        <div>
           <Toolbar />
           <div style={{display: "flex", justifyContent: "center", height:"50vh", alignItems:"center", overflow:"auto"}}>
           <div  style={{padding: "30px", backgroundColor:'white', width:"550px", borderRadius:'25px', display:"flex", justifyContent:"center"}}>
           <table>
            <thead style={{padding:"10px"}}>
                <th>ID</th>
                <th>Name</th>
                <th>Admin SSN</th>
                <th>Position</th>
                <th>Major</th>
                </thead>
                <tbody>
                    {data.map((d,i)=>(
                        <tr key={i}> 
                        <td>{d.Mid}</td>
                        <td>{d.nameM}</td>
                        <td>{d.Admin_ssn}</td>
                        <td>{d.Position}</td>
                        <td>{d.Major}</td>
                        </tr>
                    ))}
                </tbody>
           
           </table>
           </div>
           </div>
        </div>
    )
}