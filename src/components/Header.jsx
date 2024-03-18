import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth} from "../auth/firebase";
import { collection, where, query, getDocs} from "firebase/firestore";
import { useEffect, useState } from "react";
import FaceIcon from '@mui/icons-material/Face';


const Header = () => {
  const [user] = useAuthState(auth);
  const [nameUser, setNameUser] = useState("");

useEffect(() => {    
  const getUserData = async () => 
  {      
    const q = query(collection(db, "users"), 
  where("uid", "==", user?.uid));  

  const querySnapshot = await getDocs(q);      
  querySnapshot.forEach((doc) => {        
    const name = doc.data().name;        
    setNameUser(name);      
  });    
};    
if (user) {      
  getUserData();    
}  
}, [user]);


  return (
    <Container fluid >
        
      <Row>
    
        <Navbar className=" bg-yellow-300 text-lg" variant="light">
          <Container >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <div className="flex justify-between w-full">

              <Nav>
                <Link to="/">
                  <Button className="btnHeader" variant="contained">Home</Button>
                </Link>
                <Link to="/countries">
                  <Button  className="btnHeader"variant="contained">Countries</Button>
                </Link>
                <Link to="/favourites">
                  <Button  className="btnHeader" variant="contained">Favourites</Button>
                </Link>
                {!user &&(
                <Link to="/register">
                  <Button  className="btnHeader" variant="contained">Register</Button>
                </Link>
                )}
                {!user && (
                <Link to="/login">
                  <Button className="border border-transparent bg-gray-900 text-white px-6 rounded-lg hover:bg-gray-500">Login</Button> 
                </Link> 
                )}
                {user &&(
                <Button className="border border-transparent bg-gray-900 text-white px-6 rounded-lg hover:bg-gray-500"
                onClick={()=>{
                  logout();
                navigate("/login")}} >Logout</Button>
                )}
               
              </Nav>
              <Button className="btnHeader uppercase" variant="contained">
              {nameUser && (<span><FaceIcon /> {nameUser}</span>)}
              </Button>
              </div>
            </Navbar.Collapse>
           
          </Container>
          
        </Navbar>
        
      </Row>
     
    </Container>
  );
};

export default Header;
