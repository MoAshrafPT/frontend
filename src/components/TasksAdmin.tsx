import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { log } from "console";
import Toolbar from "./Toolbar";
import { Table } from "react-bootstrap";
import Footer from "./Footer";
import DropdownTeam from "./DropdownTeam";
type taskDataforAdmins = {
  Task_Number: number;
  DescriptionT: string;
  Project_id: number;
  start_dateT: string;
  End_date: string;
  member_id: number;
  nameM: string;
  Position: string;
  Major: string;
};

export default function TasksAdmin() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [tasksadmin, setTasksadmin] = useState<taskDataforAdmins[]>([]);
  if (localStorage.getItem("isAuthenticated") !== "true") {
    navigate("/login");
  }

  //make a request to retrieve member tasks

  useEffect(() => {
    console.log("using Tasks Admin route");
    fetch("http://localhost:8081/taskadmin/" + localStorage.getItem("userId"))
      .then((res) => res.json())
      .then((data) => {
        setTasksadmin(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Toolbar />
      <div>
        <div className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-center w-30 px-3 rounded mb-3"
            style={{ backgroundColor: "white" }}
          >
            {tasksadmin.length > 0 ? (
              <h2>Your members have the following tasks</h2>
            ) : (
              <h2>Your members have no tasks</h2>
            )}
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
                <th>Task Number</th>
                <th>Description</th>
                <th>Project ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Member ID</th>
                <th>Member Name</th>
                <th>Position</th>
                <th>Major</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {tasksadmin.map((item) => (
                <tr key={item.Task_Number}>
                  <td>{item.Task_Number}</td>
                  <td>{item.DescriptionT}</td>
                  <td>{item.Project_id}</td>
                  <td>{item.start_dateT.slice(0, -14)}</td>
                  <td>{item.End_date.slice(0, -14)}</td>
                  <td>{item.member_id}</td>
                  <td>{item.nameM}</td>
                  <td>{item.Position}</td>
                  <td>{item.Major}</td>
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
