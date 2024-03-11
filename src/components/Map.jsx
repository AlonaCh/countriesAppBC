




// import { useNavigate, useSearchParams } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { useState } from "react";

// function Map({ country }){
// const navigate = useNavigate();
// const [mapPosition, setMapPosition] = useState([40, 0])


// const [searchParams, setSearchParams] = useSearchParams();

// // const lat = searchParams.get("lat");
// // const lng = searchParams.get("lng");

// return(
// <div >
// <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true}>
// <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
  
//   <Marker position={[country.coord.lat, country.position.lng]}
//   key={country.id}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>
// </div>
// )
// }
// export default Map;