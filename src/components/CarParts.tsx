import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

export default function CarParts() {
  

  const navigate = useNavigate(); //check that the user is authenticated to view this page
  if (localStorage.getItem("isAuthenticated") !== "true") navigate("/login");



  type carPartData = {
    Part_id: number;
    Car_id: number;
    Part_Name: string;
    Price: number;
    project_id: number;
    Model: string;
    Last_maintance_date:string;
  };
  const [tools, setTools] = useState<carPartData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/carparts")
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);




  return (
    <div>
      <Toolbar />
      <div className="d-flex justify-content-center">
        <div className="d-block  rounded">
          <Table
            striped="columns"
            bordered
            hover
            responsive
            className="w-100 rounded"
          >
            <thead className="rounded">
              <tr>
                <th>Part ID</th>
                <th>Car ID</th>
                <th>Part Name</th>
                <th>Price</th>
                <th>Project ID</th>
                <th>Model</th>
                <th>Last Maintenance Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {tools.map((item) => (
                <tr key={item.Part_id}>
                  <td>{item.Part_id}</td>
                  <td>{item.Car_id}</td>
                  <td>{item.Part_Name}</td>
                  <td>{item.Price} EGP</td>
                  <td>{item.project_id}</td>
                  <td>{item.Model}</td>
                  <td>{item.Last_maintance_date.slice(0, -14)}</td>
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
