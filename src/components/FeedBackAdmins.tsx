import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

export default function FeedBackAdmins() {
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
    Feedback_Content: string;
    T_ID: number;
    FeedBack_Date: string;
  };
  const [feedback, setfeedback] = useState<FeedBackdata[]>([]);
  useEffect(() => {
    fetch(
      'http://localhost:8081/feedbackadmin/' + localStorage.getItem("userId")
    )
      .then((res) => res.json())
      .then((data) => {
        setfeedback(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
                  <tr key={item.Feedback_Content}>
                    <td>{item.Feedback_Content}</td>
                    <td>{item.FeedBack_Date.slice(0, -14)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}