import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import settings from "../images/settings.gif";




function Toolbar() {
 const userContext = useContext(UserContext);

 
 
  return (

    <div className="nav-body" style={{marginTop:'4px',marginBottom:'4px'}}>
       <ul className="nav-links">
          <li><Link to="/home"><img src="https://cu-eco.org/img/logo.png" alt="" style={{height:'25px',paddingRight:'3px'}} />Dashboard</Link></li>


          {userContext.user && <li><Link to="/tasks">{userContext.user?.name}</Link></li>}


          <li className="center"><Link to ="/about" >About Us</Link></li>
          <li className="center"><Link to ="/cars" >Cars</Link></li>
          <li className="center"><Link to ="/members">Members</Link></li>
          {(userContext.user.id !== 0) ?
          <li className="center"><Link to = "/login" onClick={()=>{
            userContext.setUser({name:'',email:'',isAuthenticated:false,id:0});
          }}><img src=""></img> Log out</Link></li>
          : <li className="center"><Link to = "/login">Log in</Link></li>
          }
          {(userContext.user.id !== 0) ? <Link to='/settings'><img src={settings} alt="" /></Link>: <div></div>}
        
          
        </ul>
    </div>
  );
}

export default Toolbar;