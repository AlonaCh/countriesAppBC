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
    
        <div className="flex flex-col items-center">
            
        <input
        className="w-756 h-10 m-3 rounded-full
        text-stone-500  
        placeholder:text-stone-400 focus:w-72 sm:w-64 focus:outline-none focus:ring focus:ring-indigo-400"
        type="email"
        value={email}
        placeholder="Email" 
        onChange={
            (e) => setEmail(e.target.value)
        } />
        
        <input
        className="w-56 h-10 m-3 rounded-full 
        text-stone-500 placeholder:text-stone-400 focus:w-72 sm:w-64 focus:outline-none focus:ring focus:ring-indigo-400"
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
