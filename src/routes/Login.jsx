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
        // Check if email or password is empty
        if (!email || !password) {
            alert("Please fill in all the fields");
            return;
        }
        // Perform login action
        loginWithEmailAndPassword(email, password)
            .then(() => {
                // Clear email and password fields on success
                setEmail("");
                setPassword("");
                navigate("/countries"); 
            })
            .catch((error) => {
                // Handle login error if necessary
                console.error("Login failed:", error);
                // Optionally show an error message to the user
                alert("Login failed. Please try again.");
            });
    }

  return (
    
        <div className="flex flex-col items-center">
            <h1>Log in to your account</h1>
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
