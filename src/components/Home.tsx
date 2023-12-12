import React from "react";
import {Link} from "react-router-dom";
import Toolbar from "./Toolbar";
import { UserContextProvider } from "../context/UserContext";

function Home()
{  return(
    <div className="general-appearance">
        
            <Toolbar />
        
    </div>
    )
}

export default Home;