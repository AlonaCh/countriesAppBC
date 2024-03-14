import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LanguageIcon from '@mui/icons-material/Language';
import PaymentIcon from '@mui/icons-material/Payment';
import BoyIcon from '@mui/icons-material/Boy';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { closeFavourite, addFavourite } from "../store/favouritesSlice";
import { closeAllFavourites } from "../store/favouritesSlice";
import {getFavouritesFromFirebase} from "../auth/firebase";
import { Link } from "react-router-dom";


const Favourites = () => {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favourites);
  let countriesList = useSelector((state) => state.countries.countries);


  if (favourites.length > 0){
    countriesList = countriesList.filter((country)=>
    favourites.includes(country.name.common));
  }else{
    countriesList = [];
  }

  // function getBorderName(border){
  //   return countriesList.find(country => country.cca3 == border).name.common;
     
  //  }
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromFirebase());
  }, [dispatch]);

  return (
    <Container fluid>
        <Button className="border border-transparent bg-yellow-300 text-gray-900 px-6 absolute right-0 mr-20 rounded-lg hover:bg-gray-900" onClick={()=>dispatch(closeAllFavourites())}>Clear</Button>
      <Row xs={2} md={3} lg={3} className="mx-5 mt-3 g-5">
    
        {countriesList.map((country) => (
          <Col key={country.name.official} className="mt-5">
            <Card className="overflow-hidden h-100 cursor-pointer">
              <Card.Img
                variant="top"
                className="countriesImg"
                src={country.flags.svg}
                style={{
                  objectFit: "cover",
                  minHeight: "200px",
                  maxHeight: "200px",
                }}
              />
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
                  <LanguageIcon />
                    {Object.values(country.languages ?? {}).join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <PaymentIcon className="w-3 h-3"/>
                    {Object.values(country.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <BoyIcon/>
                    {country.population.toLocaleString()}
                  </ListGroup.Item>
                  {/* <ListGroup.Item>
                   {country.borders && country.borders.length > 0
                   ? country.borders.map((border)=>getBorderName(border)).join(", ")
                   : ("This country has no borders")}
                  </ListGroup.Item> */}
                </ListGroup>
              </Card.Body>
              {favourites.some(
                  (favourite) => favourite === country.name?.common
                ) ? (
                  <CloseIcon className="text-muted absolute bottom-0 right-0"
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
  );
};

export default Favourites;
