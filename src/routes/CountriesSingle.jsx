import axios from "axios";
import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

import { Container, Button, Col, Image, Row, Spinner} from "react-bootstrap";
import { AltRoute } from "@mui/icons-material";

const CountriesSingle = () => {
  //const {single} = useParams()
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const country = location.state.country;

  const[weather, setWeather] = useState('');
  const[error, setError] = useState('false');
  const[loading, setLoading] = useState('true');


  //useEffect to handle our request data:
useEffect(() =>{
  axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=b7a3558dd4231bb7517fc8c9d13c79d4`)
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
  {!error && weather && (
    <div>
      <p>
        Now it is <strong>{weather.main.temp}</strong>
        degrees in {country.capital} and {weather.weather[0].description}
      </p>
      <p>Feels like: {weather.main.
feels_like}</p>
        <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        />
      
    </div>
  )}
  </Col>
  </Row>
      <Row>
<Col>
<Button variant="light" onClick={()=>navigate("/countries")}>

</Button>
</Col>
</Row>
     
    </Container>
  );
};

export default CountriesSingle;
