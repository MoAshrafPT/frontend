import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar";
import { Carousel, Table } from "react-bootstrap";
import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import axios from "axios";

export default function Event(){
    return(
        <div>
            Kenzy
        </div>
    )
}
