import { useEffect, useState } from "react";
import Slider from "./Slider";
import Toolbar from "./Toolbar";
import { log, table } from "console";
import Footer from "./Footer";
import { DropdownMenu, Table } from "react-bootstrap";
import DropdownAdminTeam from "./DropdownAdminTeam";
type memberData = {
  Mid: number;
  nameM: string;
  Team_Name: string;
};

export default function DisciplinaryAction() {
  const [data, setData] = useState<memberData[]>([]);
  const [teamName, setTeamName] = useState<string>("All");
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  useEffect(() => {
    fetch("http://localhost:8081/discipmember/" + teamName + "")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [teamName]);
  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    memberId: number
  ) => {
    setSelectedMember(memberId);
  };
  return (
    <div>
      <Toolbar />
      <div>
        <div className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-center w-30 px-3 rounded mb-3"
            style={{ backgroundColor: "white" }}
          >
            <h2>{teamName} Members</h2>
          </div>
          <DropdownAdminTeam path={teamName} setPath={setTeamName} />
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
                <th style={{ width: "20px" }}>Select</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {data.map((item) => (
                <tr key={item.Mid}>
                  <td>{item.Mid}</td>
                  <td>{item.nameM}</td>
                  <td>
                    <input
                      type="radio"
                      value={item.Mid}
                      checked={selectedMember === item.Mid}
                      onChange={(e) => handleRadioChange(e, item.Mid)}
                      style={{ height: "20px", margin: "0px", padding: "0px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
