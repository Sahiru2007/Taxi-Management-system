import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '../../components/PassengerDashboard';
import { useStateContext } from '../../contexts/ContextProvider';
import { CiLocationOn } from 'react-icons/ci';
import Avatar from '../../data/avatar3.png';

const dummyVehicleData = [
  {
    vehicleType: 'Car',
    registrationNumber: 'ABC123',
    vehicleModel: 'Sedan',
    vehicleMake: 'Toyota',
  },
];

const dummyCurrentRideData = [
  {
    rideID: 1,
    driverID: 1,
    from: 'City A',
    destination: 'City B',
    estimatedDistance: '10 km',
    time: '15:30',
    date: '2023-01-15',
    finalPrice: 'Pending',
  },
  // Add more dummy data as needed
];

const dummyDrivers = [
  {
    driverID: 1,
    driverName: 'John Doe',
    email: 'john@example.com',
    contactNumber: '123-456-7890',
    licenseNumber: 'ABC123',
    profilePicture: Avatar,
  },
];

const CurrentRide = () => {
  const { currentColor } = useStateContext();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div className="mt-5">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full md:w-1200 mb-4 mx-auto">
        <div className="flex justify-between items-center gap-2">
          <p className="text-xl font-semibold">Current Ride's Details</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full mt-6 gap-3">
            <thead>
              <tr>
                <th className="text-left px-10 py-2 ">Ride ID</th>
                <th className="text-left px-10 py-2">From</th>
                <th className="text-left px-10 py-2">Destination</th>
                <th className="text-left px-10 py-2">Estimated Distance</th>
                <th className="text-left px-10 py-2">Time</th>
                <th className="text-left px-10 py-2">Date</th>
                <th className="text-left px-10 py-2">Final Price(Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {dummyCurrentRideData.map((ride, index) => (
                <tr key={ride.rideID}>
                  <td className="text-left px-10 py-2">{ride.rideID}</td>
                  <td className="text-left px-10 py-2" >{ride.from}</td>
                  <td className="text-left px-10 py-2">{ride.destination}</td>
                  <td className="text-left px-10 py-2">{ride.estimatedDistance}</td>
                  <td className="text-left px-10 py-2">{ride.time}</td>
                  <td className="text-left px-10 py-2">{ride.date}</td>
                  <td className="text-left px-10 py-2">{ride.finalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-5 border-t-1 border-color">
  <div className="mt-3">
    <Button color="white" bgColor={currentColor} text="Cancel" borderRadius="10px" />
  </div>
  <div className="mt-3 flex items-center">
    {/* Add checkboxes for Received Payment and Reached Destination */}
    <div className="mr-4">
      <input
        type="checkbox"
        id="receivedPayment"
        name="receivedPayment"
        className="mr-2"
      />
      <label htmlFor="receivedPayment">Received Payment</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="reachedDestination"
        name="reachedDestination"
        className="mr-2"
      />
      <label htmlFor="reachedDestination">Reached Destination</label>
    </div>

    {/* Finalize Ride Button */}
    <div className="mt-3 ml-10">
      <Button color="white" bgColor={currentColor} text="Finalize Ride" borderRadius="10px" />
    </div>
  </div>
</div>
</div>


      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full md:w-1200 mb-4 mx-auto">
        <div className="flex justify-between items-center gap-2">
          <p className="text-xl font-semibold">Passenger's Details</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full mt-6">
            <thead>
              <tr>
                <th className="text-left px-10 py-2">Driver ID</th>
                <th className="text-left px-10 py-2">Driver Name</th>
                <th className="text-left px-10 py-2">Email</th>
                <th className="text-left px-10 py-2">Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {dummyDrivers.map((driver, index) => (
                <tr key={driver.driverID}>
                  <td className="text-left px-10 py-2">{driver.driverID}</td>
                  <td className="text-left px-10 py-2" >
                    <img
                      src={Avatar}
                      alt={`Profile of ${driver.driverName}`}
                      className="w-10 h-10 rounded-full mr-1 inline-block"
                    />
                    {driver.driverName}
                  </td>
                  <td className="text-left px-10 py-2">{driver.email}</td>
                  <td className="text-left px-10 py-2">{driver.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full md:w-1200 mb-4 mx-auto">
  <h2 className="text-xl font-semibold mb-4">Live Map</h2>
  <div className="w-full md:w-1/4 lg:w-2/3 xl:w-full mx-auto m-5">
    <MapContainer
      center={userLocation || [7.2906, 80.6337]}
      zoom={userLocation ? 15 : 13}
      style={{ width: '100%', height: '70vh', borderRadius: '10px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Your Location</Popup>
          <CiLocationOn size={24} color="blue" />
        </Marker>
      )}
    </MapContainer>
  </div>
</div>

</div>
  );
};

export default CurrentRide;
