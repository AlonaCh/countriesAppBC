import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Stack from 'react-bootstrap/Stack';
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

  //real-time listener

//     useEffect(() => {
//     async function fetchData() {
//     const querySnapshot = await getDocs(collection(db, 'users'));
    
//     if (user) {
//         querySnapshot.forEach((doc) => {
//           (doc) => doc.data()
//             if (doc.uid === user.uid) {
//               console.log("userName: ", doc.data().name)
//               setNameUser(doc.data().name);
//                 // Break the loop since we found the matching user
//                 return;
//             }
//         });
//     }
//   }

//   fetchData();
// },  [user]);

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
    
        <Navbar className=" bg-violet-100" variant="light">
          <Container className="justify-content-end">
         
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav >
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link to="/countries">
                  <Button variant="contained">Countries</Button>
                </Link>
                <Link to="/favourites">
                  <Button variant="contained">Favourites</Button>
                </Link>
                {!user &&(
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
                )}
                {!user && (
                <Link to="/login">
                  <Button variant="contained">Login</Button> 
                </Link> 
                )}
                {user &&(
                <Button onClick={()=>{
                  logout();
                navigate("/login")}} >Logout</Button>
                )}
               
              </Nav>
              <p className="text-right">
              {nameUser && (<span><FaceIcon /> {nameUser}</span>)}
              </p>
            </Navbar.Collapse>
           
          </Container>
          
        </Navbar>
        
      </Row>
     
    </Container>
  );
};

export default Header;
