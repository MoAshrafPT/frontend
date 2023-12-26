import { useEffect, useState } from "react";
import { DropdownItem } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownAdminTeam from "./DropdownAdminTeam";
import DropdownButton from "react-bootstrap/DropdownButton";
type MemberData = {
  Member_ID: number;
  Member_Name: string;
};
type dropdownProps = {
  path: string;
  setPath: (pathName: string) => any;
  selectTeam: string;
};
function DropdownMemberTeam({ path, setPath, selectTeam }: dropdownProps) {
  const [options, setOptions] = useState<MemberData[]>([]);
  const [chosen, setChosen] = useState("Select Member");

  useEffect(() => {
    fetch("http://localhost:8081/discipmember/" + selectTeam)
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
                setChosen(item.Member_Name);
                setPath(item.Member_Name);
              }
            }}
          >
            {item.Member_Name}
          </DropdownItem>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default DropdownMemberTeam;
