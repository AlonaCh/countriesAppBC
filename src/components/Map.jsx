// import { useNavigate, useSearchParams } from "react-router-dom";
// import {  MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { useState } from "react";
// import './map.css';
// // import "leaflet/dist/leaflet.css";

// function Map({ country }) {
//   const defaultPosition = {
//     center: {
//     lat: country.capitalInfo.latlng[0],
//     lng: country.capitalInfo.latlng[1],
    
//     },
//     zoom: 3,
//   };
//   console.log("HQWEE", country)

//   return (
//     <div>
//       <MapContainer center={defaultPosition.center} zoom={defaultPosition.zoom} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//         />
        
//         {/* Uncomment this part if you want to display a popup */}
//          <Marker position={defaultPosition.center}> 
//         {/*   <Popup> */}
//         {/*     A pretty CSS3 popup. <br /> Easily customizable. */}
//         {/*   </Popup> */}
//         </Marker> 
//       </MapContainer>
     
//     </div>
//   );
// }

// export default Map;

// // lat: country.coord.lat,
// // lng: country.coord.lon,

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ country }) {
  const position = {
        center: {
        lat: country.capitalInfo.latlng[0],
        lng: country.capitalInfo.latlng[1],
        },
        zoom: 13,
      }
      return (
         <MapContainer center={position.center} zoom={position.zoom} style={{ height: '400px', margin: '30px', borderRadius: '10px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Marker position={position.center}>
            <Popup>
              {country.capital}
            </Popup>
          </Marker>
        </MapContainer>
      );
    }

export default Map;
