import { useEffect, useState } from "react"
import Slider from "./Slider"
import Toolbar from "./Toolbar"
import { log, table } from "console"
import Footer from "./Footer"
import { DropdownMenu, Table } from 'react-bootstrap';
import DropdownTeam from "./DropdownTeam"

type memberData ={
    Mid: number,
    nameM: string,
    Admin_Ssn: number,
    Position: string,
    Major: string,
    Team_Name:string,

}

export default function Members()
{
    const [data,setData] = useState<memberData[]>([]);
    const [teamName,setTeamName] = useState<string>('All');
    useEffect(()=>{
        fetch('http://localhost:8081/members/'+teamName+'')
        .then(res=> res.json())
        .then(data=>{setData(data); console.log(data);
        })
        .catch(err=>console.log(err));
    },[teamName]);

    


    return(
        <div>
            <Toolbar/>
            <div>
      <div className="d-flex justify-content-center">          
        <div className="d-flex justify-content-center w-30 px-3 rounded mb-3" style={{backgroundColor:'white'}} >
        <h2>{teamName} Members</h2>
      </div>
      <DropdownTeam path={teamName} setPath={setTeamName}/>
      </div>
      <div className="d-flex justify-content-center rounded">
      <Table striped='columns' bordered hover responsive className="w-100 rounded">
        <thead className="rounded">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Admin ID</th>
            <th>Position</th>
            <th>Team Name</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {/* Use map function to iterate over the data array */}
          {data.map((item) => (
            <tr key={item.Mid}>
              <td>{item.Mid}</td>  
              <td>{item.nameM}</td>
              <td>{item.Admin_Ssn}</td>
              <td>{item.Position}</td>
              <td>{item.Team_Name}</td>
              <td>{item.Major} </td>
             
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      
      
    </div>
    <Footer/>
        </div>
    )
}