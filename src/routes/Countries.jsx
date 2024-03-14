import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LanguageIcon from '@mui/icons-material/Language';
import PaymentIcon from '@mui/icons-material/Payment';
import BoyIcon from '@mui/icons-material/Boy';
import FlagIcon from '@mui/icons-material/Flag';
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite, closeFavourite } from "../store/favouritesSlice";
import { getFavouritesFromFirebase } from "../auth/firebase";
import Form from 'react-bootstrap/Form';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from "react-router-dom";




const Countries = () => {
  const dispatch = useDispatch();

  //Connect Countries.jsx to store and replace the countriesList and loading with values from redux.
  //to acces the store
  const [search, setSearch] = useState("");

  const countriesList = useSelector((state)=> state.countries.countries);
  const loading = useSelector((state) =>state.countries.isLoading);
  const favourites = useSelector((state) => state.favourites.favourites);


  function searchHandler(event) {
    setSearch(event.target.value.toLowerCase());
  }

  function getBorderName(border){
   return countriesList.find(country => country.cca3 == border).name.common;
    
  }
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromFirebase());// Dispatch action to fetch favourites from Firebase
  }, [dispatch]); // Dependency array: dispatch function

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <>

    <Container fluid>
      <Row className="flex flex-col items-center">
    <Form.Control className="w-96 rounded-full py-2 mt-5 mb-5 placeholder:text-stone-600 focus:w-1/2 sm:w-64 focus:outline-none focus:ring focus:ring-zinc-400"  type="text" placeholder="Search..." 
    onChange={searchHandler}/>
    </Row>

      <Row xs={2} md={3} lg={3} className="mx-5 g-5">
        {countriesList
        .filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
        .map((country) => (
          <Col key={country.name.common} className="mt-5">
            <Card className="overflow-hidden h-100 cursor-pointer">
            
            <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
              <Card.Img
                variant="top"
                className="countriesImg "
                src={country.flags.svg}
                style={{
                  objectFit: "cover",
                  minHeight: "200px",
                  maxHeight: "200px",
                }}
                
              />
           </Link>
              <Card.Body className="d-flex flex-column text-sm">
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {country.name.official}
                </Card.Subtitle>
                <ListGroup
                  variant="flush"
                  className="flex-grow-1 justify-content-end"
                >
                  <ListGroup.Item>
                    <LanguageIcon className="text-sm"/>
                    {Object.values(country.languages ?? {}).join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <PaymentIcon className="w-6 h-6"/>
                    {Object.values(country.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <BoyIcon/>
                    {country.population.toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FlagIcon className="text-muted"/>
                   {country.borders && country.borders.length > 0
                   ? country.borders.map((border)=>getBorderName(border)).join(", ")
                   : ("This country has no borders")}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              {favourites.some(
                  (favourite) => favourite === country.name?.common
                ) ? (
                  <LoyaltyIcon
                    onClick={() =>
                      dispatch(closeFavourite(country.name.common))
                    }
                  />
                ) : (
                  <FavoriteIcon
                    onClick={() => dispatch(addFavourite(country.name.common))}
                  />
                )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default Countries;
