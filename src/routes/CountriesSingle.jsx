import axios from "axios";
import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
const { VITE_OPENWEATHER_API } = import.meta.env;
 import Map from "../components/Map";
 


import { Container, Button, Col, Image, Row, Spinner} from "react-bootstrap";
import { AltRoute } from "@mui/icons-material";

const CountriesSingle = () => {
  const location = useLocation();
  console.log("location", location);
  const navigate = useNavigate();
  const country = location.state.country;
  console.log("COUNTRY", country);

  const[weather, setWeather] = useState('');
  const[error, setError] = useState('false');
  const[loading, setLoading] = useState('true');

  //  let temperature = Math.round(weather.main.temp);
  //  let feelsTemperature = Math.round(weather.main.feels_like);

  //useEffect to handle our request data:
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

console.log(weather);

if(loading){
  return(
    <Col className="text-center m-5">
    <Spinner animation="grow" />
  </Col>
  );
}

  return (
    <>
    <Container className="flex flex-col justify-center items-center" >
      {/* <Row className="m-5">
        <Col> */}
        {/* <Image
thumbnail
src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`} alt={`${country.name.common}`}
/> */}
<img className="object-cover size-full mt-3 rounded-md" src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`} alt={`${country.name.common}`}/>
  {/* </Col>
  <Col> */}
  <h2 className="text-center text-5xl mt-2">{country.name.common}</h2>
  <h3 className="text-center text-2xl mt-2 text-zinc-500">{country.capital}</h3>
  {}
   {/*  {!error && weather && (  */}
   <div className="flex justify-center items-center rounded-md mt-3 mb-4 text-zinc-950 bg-[url('/weatherpic.jpg')] ">

   <div className="flex justify-between w-72 h-40 mx-5 items-center ">
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
         </div>
         </div>
      </div>
    
  {/* )} */}
  {/* </Col>
  </Row>
      <Row>
<Col> */}
{/* <Button variant="primary" size="sm" onClick={()=>navigate("/countries")}>
&larr; Back to countries
</Button> */}
<Button className="border border-transparent bg-gray-900 text-white px-6 rounded-lg hover:bg-gray-500 "
onClick={()=>navigate("/countries")} >&larr; Back to countries</Button>

{/* </Col>
</Row> */}

    </Container>
    <div id="map">
    <Map country={country}/>
   </div>
    </>
  );
};

export default CountriesSingle;
