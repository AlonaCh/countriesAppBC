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

  return (
    <Container>
      <div>Single Country will be here</div>
    </Container>
  );
};

export default CountriesSingle;
