import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import markerIconImg from "../../assets/location.png"; // ✅ Tu imagen personalizada

// ✅ Crear el ícono personalizado con tu imagen
const customIcon = L.icon({
  iconUrl: markerIconImg,
  iconSize: [30, 40],      // Ajusta según el tamaño de tu imagen
  iconAnchor: [15, 40],    // Para que la punta del marcador esté en el punto exacto
});

// Solucionar problema de íconos por defecto de Leaflet (opcional si no los usas)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapSelector = ({ position, setPosition }) => {
  const mapRef = useRef();

  const SearchControl = () => {
    const map = useMapEvents({});
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: true,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
      });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map]);
    return null;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return null;
  };

  return (
    <div style={{ height: "300px", width: "100%", borderRadius: "10px", overflow: "hidden" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
        <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
        <SearchControl />
        <MapClickHandler />
        <Marker position={position} icon={customIcon} /> {/* ✅ Aquí usamos el ícono personalizado */}
      </MapContainer>
    </div>
  );
};

export default MapSelector;