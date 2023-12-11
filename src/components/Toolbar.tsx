import { Link } from "react-router-dom";



function Toolbar(props: {state:string}) {
  const state = props.state;

  return (

    <div className="nav-body">
       <ul className="nav-links">
          <li><Link to="/home">Dashboard</Link></li>
          <li className="center"><Link to ="/about" >About Us</Link></li>
          <li className="center"><Link to ="/cars" >Cars</Link></li>
          <li className="center"><Link to ="/members">Members</Link></li>
          {state==='guest'? <li className="center"><Link to = "/login">Login</Link></li>
           :<span style={{display:'flex'}}>
             <li className="center"><Link to = "/profile">Username</Link></li>
             <li className="center"><Link to = "/login">Log out</Link></li>
            </span>}
          
  </ul>
    </div>
  );
}

export default Toolbar;