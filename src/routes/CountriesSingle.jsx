import axios from "axios";
import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

import { Container, Button, Col, Image, Row, Spinner} from "react-bootstrap";

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

  return (
    <Container>
      <div>Single Country will be here</div>
    </Container>
  );
};

export default CountriesSingle;
