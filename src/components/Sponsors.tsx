import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar";
import { Carousel } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import magnusinc from "../images/magnusinc.jpg";
const data = [
  {
    id: 1,
    title: "57357",
    content:
      "https://scontent.fcai19-5.fna.fbcdn.net/v/t1.18169-9/13620700_661949357289996_6301192236999873885_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c2f564&_nc_ohc=R1Ju7t4YVcwAX8_URLF&_nc_ht=scontent.fcai19-5.fna&oh=00_AfCjjJ66H_BG4a_NI0c1Y5YMY3X7CWepl3zEz0yF079Pdw&oe=65A15DE5",
  },
  {
    id: 2,
    title: "MAGNUS INC.",
    content: magnusinc,
  },
  {
    id: 3,
    title: "Shell",
    content:
      "https://scontent.fcai19-5.fna.fbcdn.net/v/t1.18169-9/13620700_661949357289996_6301192236999873885_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c2f564&_nc_ohc=R1Ju7t4YVcwAX8_URLF&_nc_ht=scontent.fcai19-5.fna&oh=00_AfCjjJ66H_BG4a_NI0c1Y5YMY3X7CWepl3zEz0yF079Pdw&oe=65A15DE5",
  },
];

export default function Sponsors() {
  return (
    <div className="general-appearance">
      <Toolbar />
      <div>
        <Carousel
          className="d-flex justify-content-center"
          style={{ width: "600px", margin: "auto" }}
        >
          {data.map((item) => (
            <Carousel.Item key={item.id}>
              <h3>{item.title}</h3>
              <img
                style={{ width: "100%", height: "300px" }}
                src={item.content}
                alt=""
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}
