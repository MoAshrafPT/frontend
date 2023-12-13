import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";




function Toolbar() {
 const userContext = useContext(UserContext);

 
 
  return (

    <div className="nav-body">
       <ul className="nav-links">
          <li><Link to="/home"><img src="https://cu-eco.org/img/logo.png" alt="" style={{height:'25px',paddingRight:'3px'}} />Dashboard</Link></li>


          {userContext.user && <li><Link to="/tasks">{userContext.user?.name}</Link></li>}


          <li className="center"><Link to ="/about" >About Us</Link></li>
          <li className="center"><Link to ="/cars" >Cars</Link></li>
          <li className="center"><Link to ="/members">Members</Link></li>
          {(userContext.user.id !== 0) ?<li className="center"><Link to = "/login" onClick={()=>{
            //userContext.setUser({name:'',email:'',isAuthenticated:false,id:0});
          }}>Log out</Link></li>
          : <li className="center"><Link to = "/login">Log in</Link></li>
          }
        
          
        </ul>
    </div>
  );
}

export default Toolbar;