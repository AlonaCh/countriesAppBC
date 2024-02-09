const { useState } = require("react");
import useAuthState from "react-firebase-hooks/auth";
import {auth} from "../auth/firebase";

const Register = ()=> {
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
}

export default Register;