import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";



const Home = () => {

  return (
    <div className="flex flex-col justify-center items-center h-screen font-poppins">
    
      <img className="object-cover w-screen rounded-full mb-10" src={'country.jpg'} alt={`world`} style={{ maxHeight: '60vh' }} />
    
      <h1 className="text-5xl underline decoration-yellow-300">Welcome to discover the world! </h1>
      <h3 className="text-2xl text-zinc-500 mt-3">Please start by logging</h3>
      <Button className="border border-transparent bg-gray-900 text-white px-8 rounded-lg mt-6 mb-20 hover:bg-gray-500"> 
      <NavLink to="/login" >Login</NavLink>
      </Button>
     
    </div>
  );
};

export default Home;
