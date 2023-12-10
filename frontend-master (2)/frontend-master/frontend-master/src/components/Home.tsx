import React from "react";
import {Link} from "react-router-dom"
import Navbar from "./Navbar";
import Carousel from 'react-bootstrap/Carousel';

function Home()
{  return(
    <div className="general-appearance" >
        <Navbar/>
        <div className = 'float-text'>
            <p>Hello</p>
        </div>
        {/* <div>
            <Carousel>
                <Carousel.Item>
                    <img src="" alt="" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
         </Carousel>
        </div> */}
    </div>
    )
}

export default Home;