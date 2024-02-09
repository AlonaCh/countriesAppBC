import React from 'react'
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        loginWithEmailAndPassword(email, password);
    }

  return (
    
        <div>
        
        
        <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={
            (e) => setEmail(e.target.value)
        } />
        
        <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={
            (e) => setPassword(e.target.value)
        } />
        <Button onClick={login}>Login</Button>
        </div>
          )
  
}

export default Login
