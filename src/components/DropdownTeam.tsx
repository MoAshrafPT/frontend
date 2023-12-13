import { useEffect, useState } from 'react';
import { DropdownItem } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
type teamData = {
    Team_ID:number,
    Team_Name:string
}


function DropdownTeam() {

  const [options,setOptions]= useState<teamData[]>([]);
  const [chosen,setChosen]= useState('Select Team');
  useEffect(()=>{
      fetch('http://localhost:8081/teams')
      .then(res=> res.json())
      .then(data=>setOptions(data))
      .catch(err=>console.log(err));
  },[]);


  return (
    
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {chosen}
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <DropdownItem onClick={()=>setChosen('All')}>All</DropdownItem>
        {options.map((item)=> (
          <DropdownItem onClick={()=>{setChosen(item.Team_Name)
          }}>{item.Team_Name}</DropdownItem>
        ))}
       
      </Dropdown.Menu>
    </Dropdown>
    
  
  );
}

export default DropdownTeam;