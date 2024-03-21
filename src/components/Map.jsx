import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css';
import customIconUrl from './custom-icon.png'; // Import custom icon image

function Map({ country }) {
  const position = {
    center: {
      lat: country.capitalInfo.latlng[0],
      lng: country.capitalInfo.latlng[1],
    },
    zoom: 11,
  };

  // Define custom icon options
  const customIcon = L.icon({
    iconUrl: customIconUrl, // URL of the custom icon image
    iconSize: [40, 40], // Size of the icon image (width, height)
    iconAnchor: [20, 40], // Position of the icon anchor relative to the icon image (center bottom)
    popupAnchor: [0, -40], // Position of the popup anchor relative to the icon (top center)
  });

  return (
    <MapContainer center={position.center} zoom={position.zoom} style={{ height: '500px', margin: '30px', borderRadius: '10px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position.center} icon={customIcon}>
        <Popup>{country.capital}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
