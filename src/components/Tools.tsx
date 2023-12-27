import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

export default function Tools() {
  let clickPath = "";

  const navigate = useNavigate(); //check that the user is authenticated to view this page
  if (localStorage.getItem("isAuthenticated") !== "true") navigate("/login");

  //check the role of the use before they click on view requests. if they are a member they will only view their own requests, admins and managers can view ALL requests
  if (localStorage.getItem("role") === "member") {
    clickPath = "/myrequests";
  } else if (
    localStorage.getItem("role") === "admin" ||
    localStorage.getItem("role") === "manager"
  ) {
    clickPath = "/allrequests";
  }

  type toolData = {
    Tool_id: number;
    Tool_Name: string;
    Stock: number;
    Cost: number;
    Requirement_date: string;
  };
  const [tools, setTools] = useState<toolData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/tools")
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  type FormData = {
    toolName: string;
    quantity: number;
    requestDeadline: string;
  };
  const schema: ZodType<FormData> = z.object({
    toolName: z.string().min(1),
    quantity: z.number().gt(0),
    requestDeadline: z.string().regex(dateRegex),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [requestedTool, setRequestedTool] = useState<string>("");
  const [requestedQuantity, setRequestedQuantitiy] = useState<number>(0);
  const [requestedDDL, setRequestedDDL] = useState<number>(
    new Date().getDate()
  );

  const submitData = (data: FormData) => {
    axios
      .post("http://localhost:8081/requesttools", {
        tool: data.toolName,
        quantity: data.quantity,
        memberID: Number(localStorage.getItem("userId")),
        deadline: data.requestDeadline,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    alert("Tool requested successfully");
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
                <th>Tool ID</th>
                <th>Tool Name</th>
                <th>Stock</th>
                <th>Cost</th>
                <th>Requirement date</th>
              </tr>
            </thead>
            <tbody>
              {/* Use map function to iterate over the data array */}
              {tools.map((item) => (
                <tr key={item.Tool_id}>
                  <td>{item.Tool_id}</td>
                  <td>{item.Tool_Name}</td>
                  <td>{item.Stock}</td>
                  <td>{item.Cost} EGP</td>
                  <td>{item.Requirement_date.slice(0, -14)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {localStorage.getItem("role") === "member" && (
            <div className="formContainer">
              <div className="big-box">
                <form
                  action=""
                  className="form1"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="mb-3">
                    <label htmlFor="name">
                      <strong>Tool Name</strong>
                    </label>
                    <div className="box">
                      <input
                        type="text"
                        {...register("toolName")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setRequestedTool(e.target.value);
                        }}
                      />
                      {errors.toolName && (
                        <span className="error-msg">Cannot leave as empty</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="quantity">
                      <strong>Quantity</strong>
                    </label>
                    <div className="box">
                      <input
                        type="number"
                        {...register("quantity", { valueAsNumber: true })}
                      />
                      {errors.quantity && (
                        <span className="error-msg">
                          {errors.quantity.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name">
                      <strong>Deadline for acquiring</strong>
                    </label>
                    <div className="box">
                      <input type="date" {...register("requestDeadline")} />
                      {errors.requestDeadline && (
                        <span className="error-msg">Date required!</span>
                      )}
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="Request tool"
                    className="btn btn-success btn-highlight mb-4 w-100"
                  />
                </form>
              </div>
            </div>
          )}

          {(localStorage.getItem("role") === "manager" ||
            localStorage.getItem("role") === "admin" ||
            localStorage.getItem("role") === "member") && (
            <Link to={clickPath}>
              <button className="btn btn-secondary btn-highlight mt-4 w-100">
                View Incoming Requests
              </button>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
