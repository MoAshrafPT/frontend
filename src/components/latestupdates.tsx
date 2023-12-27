import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { log } from "console";
import Toolbar from "./Toolbar";
import { Table } from "react-bootstrap";
import Footer from "./Footer";
type updatesData = {
  member_id: number;
  theUpdate: string;
};
export default function LatestUpdates() {
  const [data, setData] = useState<updatesData[]>([]);
  useEffect(() => {
    fetch("http://localhost:8081/getupdate/" + localStorage.getItem("userId"))
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
            <h2>Updates</h2>
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
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {data.map((item) => (
                <tr key={item.member_id}>
                  <td>{item.member_id}</td>
                  <td>{item.theUpdate}</td>
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
