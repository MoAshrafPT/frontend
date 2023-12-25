import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar";
import { Carousel } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";

type CarsData = {
  CID: number;
  Name: string;
  Type: string;
  Model: string;
  Logo: string;
};

//to be replaced with data from database
// const data = [
//   {
//     id: 1,
//     title: "Anubis",
//     content:
//       "https://scontent.fcai19-5.fna.fbcdn.net/v/t1.18169-9/13620700_661949357289996_6301192236999873885_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c2f564&_nc_ohc=R1Ju7t4YVcwAX8_URLF&_nc_ht=scontent.fcai19-5.fna&oh=00_AfCjjJ66H_BG4a_NI0c1Y5YMY3X7CWepl3zEz0yF079Pdw&oe=65A15DE5",
//   },
//   {
//     id: 2,
//     title: "TS-479",
//     content:
//       "https://scontent.fcai19-5.fna.fbcdn.net/v/t31.18172-8/12977226_10153825636356773_4080381792701234355_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=2Bh917DomvoAX_qZ2eq&_nc_ht=scontent.fcai19-5.fna&oh=00_AfDiaVOw9J5Jpr32N2s8RWIwMYl0xaC7PaKkXsjCpknyBQ&oe=65A14235",
//   },
//   {
//     id: 3,
//     title: "Q-Jet",
//     content:
//       "https://scontent.fcai19-5.fna.fbcdn.net/v/t1.18169-9/13620700_661949357289996_6301192236999873885_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c2f564&_nc_ohc=R1Ju7t4YVcwAX8_URLF&_nc_ht=scontent.fcai19-5.fna&oh=00_AfCjjJ66H_BG4a_NI0c1Y5YMY3X7CWepl3zEz0yF079Pdw&oe=65A15DE5",
//   },
// ];
const awards = [
  {
    id: 1,
    title: "Fastest in the west!",
    description: "Reached speed up to 80Km/hr",
    image:
      "https://cdn11.bigcommerce.com/s-aub1q7pn32/images/stencil/original/products/16196/59561/Racing-Checkered-Flag-Trophy-Engraved-Derby-Wreath-Award-7-CM-98148-Decade-Awards_40096__40863.1691981563.jpg?c=2", // Replace with your actual image URL
  },
  {
    id: 2,
    title: "Most economic",
    description: "travelled 100km on 2L of fuel",
    image:
      "https://cms.themessenger.com/wp-content/uploads/2023/09/eth_zurich_gokart1.jpg",
  },
  {
    id: 3,
    title: "Slick & Smooth",
    description: "Most aerodynamic design ",
    image:
      "https://img.freepik.com/premium-vector/gold-cup-medal-checkered-racing-flag-auto-vector_269504-1464.jpg?w=2000",
  },
];

export default function Cars() {
  const [data, setData] = useState<CarsData[]>([]);
  useEffect(() => {
    fetch("http://localhost:8081/cars/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="general-appearance">
      <Toolbar />
      <div>
        <Carousel
          className="d-flex justify-content-center"
          style={{ width: "600px", margin: "auto" }}
        >
          {data.map((item) => (
            <Carousel.Item key={item.CID}>
              <h3>{item.Name}</h3>
              <img
                style={{ width: "100%", height: "300px" }}
                src={item.Logo}
                alt=""
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <Container>
          <h2>Car Awards</h2>
          <Row>
            {awards.map((item) => (
              <Col key={item.id} xs={12} md={4}>
                <Card style={{ marginBottom: "20px" }}>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={`Image for ${item.title}`}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
