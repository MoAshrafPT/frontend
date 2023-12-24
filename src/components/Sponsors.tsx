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
    content: "https://cdn2.downdetector.com/static/uploads/logo/3_JNoDoWg.png",
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
      "https://cdn.icon-icons.com/icons2/2699/PNG/512/shell_logo_icon_169759.png",
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
