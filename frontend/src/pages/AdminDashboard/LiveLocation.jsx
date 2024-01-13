import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useStateContext } from '../../contexts/ContextProvider';

const LiveLocation = () => {
    const { currentColor, currentMode } = useStateContext();
  const [driverCoordinates, setDriverCoordinates] = useState([]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      const newCoordinates = generateRandomCoordinates();
      setDriverCoordinates(newCoordinates);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomCoordinates = () => {
    const latitude = 7.2906 + Math.random() * 0.1;
    const longitude = 80.6337 + Math.random() * 0.1;
    return [{ latitude, longitude }];
  };

 

  return (
    <div className="flex flex-col h-4/5 m-6 rounded-3xl overflow-hidden bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 mt-12">
      <div className="flex justify-between items-center gap-2 mb-4">
        <p className="font-semibold text-2xl">Live Location</p>
        <input
          type="text"
          placeholder="Search drivers..."
          className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <MapContainer
        center={[7.2906, 80.6337]}
        zoom={13}
        style={{ width: '100%', height: '750px', borderRadius: '10px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {driverCoordinates.map((coord, index) => (
          <Marker key={index} position={[coord.latitude, coord.longitude]}>
            <Popup>A taxi driver's location.</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LiveLocation;
