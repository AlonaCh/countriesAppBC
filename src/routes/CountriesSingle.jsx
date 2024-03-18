import axios from "axios";
import { Link, useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { initializeCountries } from "../store/countriesSlice";
const { VITE_OPENWEATHER_API } = import.meta.env;
import Map from "../components/Map";
import { Container, Button, Col, Spinner} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";



const CountriesSingle = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const country = location.state.country;
  const[weather, setWeather] = useState('');
  const[error, setError] = useState('false');
  const[loading, setLoading] = useState('true');
  const countriesList = useSelector((state)=> state.countries.countries);

useEffect(() => {
  dispatch(initializeCountries());
}, [dispatch]);


useEffect(() =>{
  axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${VITE_OPENWEATHER_API}`)
  .catch((error)=>{
    console.log(error);
    setError(true);
  })
  .then((res)=>{
    setWeather(res.data);
    setLoading(false);
  });
},[country.capital]);

if(loading){
  return(
    <Col className="text-center m-5">
    <Spinner animation="grow" />
  </Col>
  );
}

  return (
    <>
    <Container className="flex flex-col justify-center items-center font-poppins" >
<img className="h-96 mt-3 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110" src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`} alt={`${country.name.common}`}/>
  <h2 className="fonttext-center text-5xl mt-2">{country.name.common}</h2>
  <h3 className="text-center text-2xl mt-2 text-zinc-500">{country.capital}</h3>
 
   <div className="flex justify-center items-center rounded-md mt-3 mb-4 text-zinc-950 bg-[url('/weatherpic.jpg')] ">
   <div className="flex justify-between w-72 h-44 mx-5 items-center ">
         <div>
        <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
      </div>
      <div>
        <div className="mb-px">
    <strong>{Math.round(weather.main.temp)}°</strong> 
         <span> in {country.capital}</span>
         </div>
         <p>Feels like: <strong>{Math.round(weather.main.feels_like)}°</strong></p>
         <p>Humidity: <strong>{Math.round(weather.main.humidity)}%</strong></p>  
         </div>
         </div>
      </div>
<Button className="border border-transparent bg-gray-900 text-white px-6 rounded-lg hover:bg-gray-500 "
onClick={()=>navigate("/countries")} >&larr; Back to countries</Button>
    </Container>
    <Map className="map" country={country}/>
    </>
  );
};

export default CountriesSingle;
