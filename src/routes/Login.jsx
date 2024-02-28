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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
    <div className="flex flex-col justify-center p-8 md:p-14">
    <span className="mb-3 text-4xl font-bold">Log in</span>
    <div className="py-4">
        <span className="mb-2 text-md">Email</span>
        <input
        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        type="email"
        value={email}
        placeholder="Enter full name" 
        onChange={
            (e) => setEmail(e.target.value)
        } />
           </div>
           <div className="py-4">
            <span className="mb-2 text-md">Password</span>
        <input
        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        type="password"
        value={password}
        placeholder="Enter password"
        onChange={
            (e) => setPassword(e.target.value)
        } />
        </div>
        <Button onClick={login} className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">Login</Button>
        
        <div className="text-center text-gray-400">
            Don't have an account?
            <span className="font-bold text-black" onClick={()=> navigate("/register")}> Sign up here
                </span>
     
        </div>
        </div>
       </div>
        </div>
          )
  
}

export default Login;
