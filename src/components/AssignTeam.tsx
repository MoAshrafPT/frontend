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

type teamData = {
    Team_ID: number,
    Team_Name: string,
    TA_ID: number,
}




  



export default function AssignTeam() {
  const navigate = useNavigate();

  if(localStorage.getItem("role") !== 'admin'){
    navigate('/home');
  }
 const [selectedMember, setSelectedMember] = useState<number | null>(null);
 const [selectedTeam, setSelectedTeam] = useState<number | null>(null);






  const [data, setData] = useState<memberData[]>([]);

  const [teams, setTeams] = useState<teamData[]>([]);
  
 


  useEffect(() => {
    fetch("http://localhost:8081/teamless")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:8081/adminteams/" + localStorage.getItem("userId"))
    .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        console.log(data);
      })
      .catch((err) => console.log(err));


  }, []);
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>, memberId: number) => {
    setSelectedMember(memberId);
  };

  const handleRadioChange2 = (e: React.ChangeEvent<HTMLInputElement>, Team_ID: number) => {
    setSelectedTeam(Team_ID);
  };
  const assignMember = ()=>{
    axios.post("http://localhost:8081/assignmember",{admin:localStorage.getItem("userId"), team:selectedTeam,member:selectedMember})
    .then(res=> console.log(res)
    ).then(data => {console.log(data)
        alert('member assigned')
    }
    ).catch(err => console.log(err)
    )
  }

  return (
    <div>
      <Toolbar />
      <div>
        <div className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-center w-30 px-3 rounded mb-3"
            style={{ backgroundColor: "white" }}
          >
            <h2>New Members</h2>
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
                <th>Team ID</th>
                <th>Team Name</th>
               
                <th style={{width:"20px"}}>Select</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {teams.map((item) => (
                <tr key={item.Team_ID}>
                  <td>{item.Team_ID}</td>
                  <td>{item.Team_Name}</td>
                 
                  <td><input
                    type="radio"
                    value={item.Team_ID}
                    checked={selectedTeam === item.Team_ID}
                    onChange={(e) => handleRadioChange2(e, item.Team_ID)}
                    style={{ height: "20px", margin: "0px", padding: "0px" }}
              /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {(selectedMember && selectedTeam) && 
        <div className="d-flex justify-content-center">
        <form action="" onSubmit={assignMember}>
            <input
             type="submit"
             value="Assign to team"
             className="btn btn-success btn-highlight mb-4 w-100"
             />
        </form>
        </div>
   }
      </div>
      <Footer />
    </div>
  );
}