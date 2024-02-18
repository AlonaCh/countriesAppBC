import axios from "axios";
import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
const { VITE_OPENWEATHER_API } = import.meta.env;

import { Container, Button, Col, Image, Row, Spinner} from "react-bootstrap";
import { AltRoute } from "@mui/icons-material";

const CountriesSingle = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const country = location.state.country;

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
    <Container>
      <Row className="m-5">
        <Col>
        <Image
thumbnail
src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`} alt={`${country.name.common}`}
/>
  </Col>
  <Col>
  <h2 className="display-4">{country.name.common}</h2>
  <h3>{country.capital}</h3>
   {/*  {!error && weather && (  */}
    <div>
      <p>
         Now it is <strong>{Math.round(weather.main.temp)}°</strong> 

         <span> in {country.capital} and {weather.weather[0].description}</span>
      </p>
       <p>Feels like: <strong>{Math.round(weather.main.feels_like)}°</strong></p> 
        <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        />
      
    </div>
  {/* )} */}
  </Col>
  </Row>
      <Row>
<Col>
<Button variant="primary" size="lg" onClick={()=>navigate("/countries")}>
Countries
</Button>
</Col>
</Row>
    </Container>
  );
};

export default CountriesSingle;
