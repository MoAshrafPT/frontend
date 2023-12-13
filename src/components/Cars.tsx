import React, { useContext, useEffect } from "react";
import {Link} from "react-router-dom"
import Toolbar from "./Toolbar";
import { Carousel } from "react-bootstrap";
import { Card, Container, Row, Col } from 'react-bootstrap'
//to be replaced with data from database
const data = [
    { id: 1, title: 'Slide 1', content: 'Content for slide 1' },
    { id: 2, title: 'Slide 2', content: 'Content for slide 2' },
    { id: 3, title: 'Slide 3', content: 'Content for slide 3' },
  ];
  const data2 = [
    {
      id: 1,
      title: 'Card 1',
      description: 'Description for card 1',
      image: 'https://placekitten.com/200/200', // Replace with your actual image URL
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'Description for card 2',
      image: 'https://placekitten.com/200/201',
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'Description for card 3',
      image: 'https://placekitten.com/200/202',
    },
  ];


export default function Cars()
{
   
    
    return (
    <div className="general-appearance">
      <Toolbar />
        <div>
      <h2>Carousel</h2>
      <Carousel>
        {data.map((item) => (
          <Carousel.Item key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container>
        
      <h2>Car achievements</h2>
      <Row>
        {data2.map((item) => (
          <Col key={item.id} xs={12} md={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={item.image} alt={`Image for ${item.title}`} />
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
        
    </div>
    )
}

