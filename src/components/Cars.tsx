import React from "react";
import {Link} from "react-router-dom"
import Toolbar from "./Toolbar";
import Slider from "./Slider";


export default function Cars(props: {state: string})
{
    return (
    <div className="general-appearance">
        <Toolbar />
        <Slider/>
        
    </div>
    )
}

