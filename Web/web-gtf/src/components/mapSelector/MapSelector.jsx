// components/MapSelector.jsx

import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332,
};

const MapSelector = ({ position, setPosition }) => {
  const [center, setCenter] = useState(position || defaultCenter);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (position?.lat && position?.lng) {
      setCenter(position);
    }
  }, [position]);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place?.geometry) {
      const newCoords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(newCoords);
      setPosition(newCoords);
    }
  };

  const handleMapClick = (e) => {
    const coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setPosition(coords);
  };

  const handleMarkerDragEnd = (e) => {
    const coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setPosition(coords);
  };

  return (
    <>
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Buscar dirección"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onClick={handleMapClick}
      >
        {position?.lat && position?.lng && (
          <Marker
            position={position}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </>
  );
};

export default MapSelector;