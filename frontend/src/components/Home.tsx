import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Toolbar from "./Toolbar";
import { UserContextProvider } from "../context/UserContext";
import { Card, Container, Row, Col } from 'react-bootstrap';
import Footer from "./Footer";
import {memberView,guestView,adminView,sponsorView,managerView} from "./ImportedViews";


  //TODO: Create Admin view, Member View for dashboard

 


function Home()
{  
  console.log(localStorage.getItem('role'),'from home');
  const [view,setView] = useState<string | null>('guest');
  useEffect(()=>{
    setView(localStorage.getItem('role'))
  })
  
  let chosenView:any = guestView;
  //check if user is registered to the system
  if(localStorage.getItem("username")){
    if(localStorage.getItem('role')==='member'){
      chosenView = memberView;
    }else if(localStorage.getItem('role')==='admin')
    {
      chosenView =adminView;
    }else if(localStorage.getItem('role')==='manager')
    {
      chosenView =managerView;
    }else if(localStorage.getItem('role')==='sponsor')
    {
      chosenView =sponsorView;
    }

  }
  
  
  return(
    <div className="general-appearance">
        
        <Toolbar />
        <Container>
        
      
      <Row>
        {chosenView.map((item:any) => (
          <Col key={item.id} xs={12} md={4}>
            <Link to={item.link} style={{textDecoration: "none"}}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={item.image} alt={`Image for ${item.title}`} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Link to = {item.link}> <button className="btn btn-success">Go to {item.title}</button></Link>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>

    
    </Container>

        
        <Footer/>
    </div>
    )
}

export default Home;