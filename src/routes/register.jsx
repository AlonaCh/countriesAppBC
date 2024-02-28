import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from "../auth/firebase"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
 
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
 
  const register = () => {
    if (!name) alert("Please enter your name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) console.log("User info:", user)
    if (user) navigate("/countries");
  }, [user, loading]);

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
<div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
<div className="flex flex-col justify-center p-8 md:p-14">
<span className="mb-3 text-4xl font-bold">Sign up</span>
<div className="py-4">
<span className="mb-2 text-md">Full name</span>
<input
className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
type="text"
value={name}
placeholder="Enter full name"
onChange={
    (e) => setName(e.target.value)
} />
</div>
<div className="py-4">
<span className="mb-2 text-md">Email</span>
<input
className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
type="text"
value={email}
placeholder="Enter email"
onChange={
    (e) => setEmail(e.target.value)
} />
</div>
<div className="py-4">
<span className="mb-2 text-md">Password</span>
<input
className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
type="password"
id="password"
value={password}
placeholder="Enter password"
onChange={(e) => setPassword(e.target.value)} />
</div>

<Button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300" onClick={register}>Sign up</Button>
</div>

<div className="relative">

</div>
</div>
</div>
  )
};

export default Register;