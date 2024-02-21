import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        //new
       if(!email || !password) return alert("Please fill in all the fields");
        loginWithEmailAndPassword(email, password);
    }

  return (
    
        <div className="m-3 text-center p-3">
        <input
        className="w-72 h-10 m-3"
        type="email"
        value={email}
        placeholder="Email" 
        onChange={
            (e) => setEmail(e.target.value)
        } />
        
        <input
        className="w-72 h-10 m-3"
        type="password"
        value={password}
        placeholder="Password"
        onChange={
            (e) => setPassword(e.target.value)
        } />
        <Button onClick={login} className="font-semibold text-yellow-300">Login</Button>
        </div>
          )
  
}

export default Login
