import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

export default function ChangePosition() {
  const navigate = useNavigate();

  if (localStorage.getItem("isAuthenticated") !== "true") navigate("/login");

  type membersdata = {
    Mid: number;
    nameM: string;
  };
  const [selected, UpdateSelected] = useState<membersdata | null>(null);
  const [membersdata, setmembersdata] = useState<membersdata[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:8081/changeposition/" + localStorage.getItem("userId")
    )
      .then((res) => res.json())
      .then((data) => {
        setmembersdata(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (item: membersdata) => {
    console.log(item.nameM);
    console.log(item.Mid);
    axios
      .patch(
        `http://localhost:8081/change/?name=${
          item.nameM
        }&id=${localStorage.getItem("userId")}`
      )
      .then((res) => {
        console.log(res);
        setmembersdata(membersdata);
        setmembersdata((prevdata) =>
          prevdata.filter((request) => request.Mid !== item.Mid)
        );
      })
      .catch((err) => console.log(err));
  };

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
                <th>Member ID</th>
                <th>Member Name</th>
                <th style={{ width: "20px" }}>Promote as Admin</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {membersdata.map((item) => (
                <tr key={item.Mid}>
                  <td>{item.Mid}</td>
                  <td>{item.nameM}</td>
                  {
                    <td>
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleUpdate(item);
                        }}
                        style={{
                          height: "20px",
                          margin: "0px",
                          padding: "0px",
                        }}
                        type="checkbox"
                      />
                    </td>
                  }
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