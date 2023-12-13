import React from "react";
import {Link} from "react-router-dom";
import Toolbar from "./Toolbar";
import { UserContextProvider } from "../context/UserContext";
import { Card, Container, Row, Col } from 'react-bootstrap'


const guestView = [
    {
      id: 1,
      title: 'Sponsors',
      description: 'View our beloved sponsors',
      image: 'https://media.istockphoto.com/id/881120664/photo/become-a-sponsor-written-on-business-card.jpg?s=612x612&w=0&k=20&c=2i55Tce2of6U37jJYrcb9t_3YHbzQux-q8zG-V2klt0=',
      link: '/sponsors'  
    },
    {
      id: 2,
      title: 'Become a member',
      description: 'Join us on our mission to change the world!',
      image: 'https://cu-eco.org/img/60203340_2387192848178622_6003228153584025600_n.jpg',
      link: '/signup' 
    },
    {
      id: 3,
      title: 'Races',
      description: 'Get news about our journey on the track',
      image: 'https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/races' 
    },
    {
        id: 4,
        title: 'Contact Us',
        description: 'Reach out to us with the click of a button',
        image: 'https://st2.depositphotos.com/1265075/7581/i/450/depositphotos_75818865-stock-photo-web-contact-us-concept.jpg',
        link: '/contact' 
    },
    {
        id: 5,
        title: 'Cars',
        description: 'View our latest creations',
        image: 'https://cu-eco.org/img/img_9197__1_-removebg-preview.png',
        link: '/cars' 
    },
    {
        id: 6,
        title: 'Awards',
        description: 'Check our latest achievments',
        image: 'https://alltogether.swe.org/wp-content/uploads/2021/09/GettyImages-1223896865-2.jpg',
        link: '/awards' 
    },
    
  ];

  const memberView =[
    {
        id: 1,
        title: 'Sponsors',
        description: 'View our beloved sponsors',
        image: 'https://media.istockphoto.com/id/881120664/photo/become-a-sponsor-written-on-business-card.jpg?s=612x612&w=0&k=20&c=2i55Tce2of6U37jJYrcb9t_3YHbzQux-q8zG-V2klt0=', // Replace with your actual image URL
      },
      {
        id: 2,
        title: 'Projects',
        description: 'See ongoing projects you are involved in',
        image: 'https://cu-eco.org/img/60203340_2387192848178622_6003228153584025600_n.jpg',
      },
      {
        id: 3,
        title: 'Races',
        description: 'Get ready for our next adventure',
        image: 'https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
          id: 4,
          title: 'tools',
          description: 'Check out our inventory and see available tools',
          image: 'https://st2.depositphotos.com/1265075/7581/i/450/depositphotos_75818865-stock-photo-web-contact-us-concept.jpg',
      },
      {
          id: 5,
          title: 'Car parts',
          description: 'View available car parts',
          image: 'https://cu-eco.org/img/img_9197__1_-removebg-preview.png',
      },

  ]


  //TODO: Create Admin view, Member View for dashboard

function Home()
{  return(
    <div className="general-appearance">
        
        <Toolbar />
        <Container>
        
      
      <Row>
        {guestView.map((item) => (
          <Col key={item.id} xs={12} md={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={item.image} alt={`Image for ${item.title}`} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Link to = {item.link}> <button className="btn btn-success">Go there</button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    
    </Container>

        
        
    </div>
    )
}

export default Home;