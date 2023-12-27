import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

export default function FeedBack() {
  let clickPath = "";

  //check the role of the use before they click on view requests. if they are a member they will only view their own requests, admins and managers can view ALL requests
  /*if (localStorage.getItem("role") === "member") {
    clickPath = "/myrequests";
  } else if (
    localStorage.getItem("role") === "admin" ||
    localStorage.getItem("role") === "manager"
  ) {
    clickPath = "/allrequests";
  }*/

  type FeedBackdata = {
    FeedBack_Content: string;
    T_ID: number;
    
  };
  const [feedback, setfeedback] = useState<FeedBackdata[]>([]);

  const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  const schema: ZodType<FeedBackdata> = z.object({
    FeedBack_Content: z.string().min(1),
    T_ID: z.number().gt(0),
   
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedBackdata>({ resolver: zodResolver(schema) });

  const [sentcontent, setsentcontent] = useState<string>("");
  const [TeamId, setTeamId] = useState<number>(0);
  const [sentdate, setsentdate] = useState<number>(new Date().getDate());

  const submitData = (data: FeedBackdata) => {
    console.log(data.FeedBack_Content);
    
    axios
      .post(
        `http://localhost:8081/feedback/?name='${data.FeedBack_Content}'&&id=${data.T_ID}`
      )
      .then((res) => {
        console.log(res);
        setfeedback(res.data);
      })
      .catch((err) => console.log(err));
    alert("FeedBack Submitted successfully");
  };
  return (
    <div>
      <Toolbar />
      <div className="d-flex justify-content-center">
        <div className="d-block  rounded">
          {(localStorage.getItem("role") === "member" ||
            localStorage.getItem("role") === "admin") && (
            <Table
              striped="columns"
              bordered
              hover
              responsive
              className="w-100 rounded"
            >
              <thead className="rounded">
                <tr>
                  <th>FeedBack Content</th>
                  <th>FeedBack Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Use map function to iterate over the data array */}
                {feedback.map((item) => (
                  <tr key={item.FeedBack_Content}>
                    <td>{item.FeedBack_Content}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {
            <div className="formContainer">
              <div className="big-box">
                <form
                  action=""
                  className="form1"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="mb-3">
                    <label htmlFor="FeedBack Content">
                      <strong>FeedBack Content</strong>
                    </label>
                    <div className="box">
                      <input
                        type="text"
                        {...register("FeedBack_Content")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setsentcontent(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                      {errors.FeedBack_Content && (
                        <span className="error-msg">Cannot leave as empty</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Team_ID">
                      <strong>Team ID</strong>
                    </label>
                    <div className="box">
                      <input
                        type="number"
                        {...register("T_ID", { valueAsNumber: true })}
                      />
                      {errors.T_ID && (
                        <span className="error-msg">{errors.T_ID.message}</span>
                      )}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Submit FeedBack "
                    className="btn btn-success btn-highlight mb-4 w-100"
                  />
                </form>
              </div>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}