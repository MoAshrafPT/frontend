import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";




function Toolbar() {
 const userContext = useContext(UserContext);
 
 
  return (

    <div className="nav-body">
       <ul className="nav-links">
          <li><Link to="/home">Dashboard</Link></li>


          {userContext.user && <li><Link to="/home">{userContext.user?.name}</Link></li>}


          <li className="center"><Link to ="/about" >About Us</Link></li>
          <li className="center"><Link to ="/cars" >Cars</Link></li>
          <li className="center"><Link to ="/members">Members</Link></li>
          {(userContext.user) ?<li className="center"><Link to = "/login" onClick={()=>{
            userContext.setUser(null);
          }}>Logout</Link></li>
          : <li className="center"><Link to = "/login">Log in</Link></li>
          }
        
          
        </ul>
    </div>
  );
}

export default Toolbar;