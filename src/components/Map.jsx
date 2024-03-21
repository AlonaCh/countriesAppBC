import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ country }) {
  const position = {
    center: {
      lat: country.capitalInfo.latlng[0],
      lng: country.capitalInfo.latlng[1],
    },
    zoom: 11,
  };

  return (
    <MapContainer center={position.center} zoom={position.zoom} style={{ height: '500px', margin: '30px', borderRadius: '10px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position.center}>
        <Popup>{country.capital}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;

