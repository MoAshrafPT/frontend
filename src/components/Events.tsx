import React, { useContext, useEffect, useRef, useState, ChangeEvent, FormEvent  } from "react";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar";
import chat from "../images/messages (1).png";
import arrow from "../images/down-arrow (1).png";
import arrow2 from"../images/arrow-right.png";
import { Carousel, Table } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

export default function Events() {
    const [data, setData] = useState<{ paragraph: string }>({ paragraph: '' });
    const [messages, setMessages] = useState<{ paragraph: string }[]>([]);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
      console.log(e.target.value);
    };
  
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newMessage = { ...data };
        setMessages([...messages, newMessage]);
        localStorage.setItem('messagesData', JSON.stringify([...messages, newMessage]));
        alert("Message was sended")
        console.log(messages);
        setData({ paragraph: '' });
      };

     useEffect(() => {
    const storedMessages = localStorage.getItem('messagesData');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);
  const deleteHandler = (index: number) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    localStorage.setItem('messagesData', JSON.stringify(updatedMessages));
  };
    return (
      <div>
        <Toolbar/>
        <div className="d-flex justify-content-center text-success bg-warning rounded h1">
             <p>New Coming Races</p>
             </div>
             {(localStorage.getItem("role")=== 'sponsor') &&
             <div className=" d-flex justify-content-center ">
             <img src={arrow2}/>
             <div className="text-white h4 d-flex justify-content-center "> <p> If you want to announce the team's admin about new update, Please, send us a message with details</p></div>
             <img src={arrow}/>
             </div>}
             
        {(localStorage.getItem("role")=== 'sponsor') &&
        <form onSubmit={submitHandler}>
          <textarea
            rows={7}
            cols={174}
            onChange={handleChange}
            name="paragraph"
            value={data.paragraph}
          className="bg-success border border-warning text-white"></textarea>
          <input
            type="submit"
            value="submit"
            className="btn btn-warning btn-highlight rounded mb-4 w-100"
          />
        </form>
        }
        {(localStorage.getItem("role")=== 'admin') &&
        <div>
            {messages.map((message, index) => (
        <div key={index}>
          <h2 className="text-white"> <img src={chat}/>Message {index + 1}</h2>
          <p className="text-success rounded h5 bg-white">{message.paragraph}</p>
          <button className="btn btn-success btn-highlight mb-4" onClick={() => deleteHandler(index) }>check as read</button>

          </div>
      ))}
            </div>
}
<Footer/>

     </div>
    );

  }