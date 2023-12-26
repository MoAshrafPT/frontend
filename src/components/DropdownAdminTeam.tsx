import { useEffect, useState } from "react";
import { DropdownItem } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
type teamData = {
  Team_ID: number;
  Team_Name: string;
};
type dropdownProps = {
  path: string;
  setPath: (pathName: string) => any;
};
function DropdownAdminTeam({ path, setPath }: dropdownProps) {
  const [options, setOptions] = useState<teamData[]>([]);
  const [chosen, setChosen] = useState("Select Team");

  useEffect(() => {
    fetch("http://localhost:8081/adminteams/" + localStorage.getItem("userId"))
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.log(err));
    console.log(options);
  }, []);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {chosen}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((item, i) => (
          <DropdownItem
            key={i}
            onClick={() => {
              {
                setChosen(item.Team_Name);
                setPath(item.Team_Name);
              }
            }}
          >
            {item.Team_Name}
          </DropdownItem>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default DropdownAdminTeam;
