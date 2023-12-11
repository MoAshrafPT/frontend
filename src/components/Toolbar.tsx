import { Link } from "react-router-dom";



function Toolbar() {
  return (
    <div className="nav-body">
       <ul className="nav-links">
          <li><Link to="/home">Dashboard</Link></li>
          <li className="center"><Link to ="/about" >About Us</Link></li>
          <li className="center"><Link to ="/cars" >Cars</Link></li>
          <li className="center"><Link to ="/members">Members</Link></li>
          <li className="center"><Link to = "/login">Login</Link></li>
  </ul>
    </div>
  );
}

export default Toolbar;