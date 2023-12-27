import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { log } from "console";
import Toolbar from "./Toolbar";
import { Table } from "react-bootstrap";
import Footer from "./Footer";
import DropdownTeam from "./DropdownTeam";
type Awards = {
  Award_name: string;
  Prize: number;
  RankA: number;
  Country_Of_Award: string;
  DateA: string;
};

export default function Awards() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [awards, setAwards] = useState<Awards[]>([]);
  console.log("Hello");
  //make a request to retrieve member tasks
  useEffect(() => {
    console.log("using Awards route");

    axios
      .get("http://localhost:8081/awards")
      .then((res) => {
        console.log(res);
        setAwards(res.data);
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
            <h2> Awards </h2>
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
                <th>Award Name </th>
                <th>Prize</th>
                <th>Award Rank</th>
                <th>Country Of Award</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {awards.map((item,i) => (
                <tr key={i}>
                  <td>{item.Award_name}</td>
                  <td>{item.Prize}</td>
                  <td>{item.RankA}</td>
                  <td>{item.Country_Of_Award}</td>
                  <td>{item.DateA.slice(0, -14)}</td>
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
