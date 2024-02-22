import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {db, auth} from "../auth/firebase";
import { collection, onSnapshot, doc, setDoc, getDocs} from "firebase/firestore";
import { useEffect, useState } from "react";

const Header = () => {
  const [user] = useAuthState(auth);
  const [nameUser, setNameUser] = useState("");

  //real-time listener

    /*useEffect(() => {
    async function fetchData() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    
    if (user) {
        querySnapshot.forEach((doc) => {
          (doc) => doc.data()
            if (doc.uid === user.uid) {
              
              setNameUser(doc.data().name);
                // Break the loop since we found the matching user
                return;
            }
        });
    }
  }

  fetchData();
},  [user, setNameUser]);*/

  return (
    <Container fluid >
      <Row>
        <Navbar className="bg-violet-100" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
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
                <Button onClick={logout}>Logout</Button>
                )}
                {nameUser && (<span>{nameUser}</span>)}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
