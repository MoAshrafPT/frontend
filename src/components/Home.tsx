import React from "react";
import {Link} from "react-router-dom";
import Toolbar from "./Toolbar";

function Home(props: {state: string})
{  return(
    <div className="general-appearance">
        <Toolbar state="guest"/>
    </div>
    )
}

export default Home;