import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import settings from "../images/settings.gif";




function Toolbar() {
 const userContext = useContext(UserContext);
 const [id,setID] = useState<any>(null)
 const [name,setName] = useState<any>(null)
 const [email,setEmail] = useState<any>(null)

 useEffect(()=>{
 setID(Number(localStorage.getItem('userId')));
 setName(localStorage.getItem('username'));
 setEmail(localStorage.getItem('email'));
 },[localStorage.getItem('userId')])



//  const id = localStorage.getItem("userId");
//  const name =localStorage.getItem("username");
//  const email = localStorage.getItem("email");

 
 
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
            
            localStorage.removeItem("AuthToken");
            localStorage.setItem("isAuthenticated",'false');
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("role");

            console.log(localStorage.getItem('role'));
            
          }}><img src=""></img> Log out</Link></li>
          : <li className="center"><Link to = "/login">Log in</Link></li>
          }
          {(userContext.user.id !== 0) ? <Link to='/settings'><img src={settings} alt="" /></Link>: <div></div>}
        
          
        </ul>
    </div>
  );
}

export default Toolbar;