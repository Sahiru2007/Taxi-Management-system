import React, { useState, useEffect } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import { MdOutlineCancel } from "react-icons/md";
import { Stacked, Pie, Button, LineChart, SparkLine } from '../../components/PassengerDashboard';
import { useStateContext } from '../../contexts/ContextProvider';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { GridComponent, ColumnsDirective, ColumnDirective, Selection, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { BsKanban, BsBarChart, BsBoxSeam, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { CiCirclePlus } from "react-icons/ci";
import { MdCardTravel } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
const ReserveTaxi = () => {
  const { currentColor, currentMode } = useStateContext();
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('1');
  const [date, setDate] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');

  const driversData = [
    { DriverID: 1, DriverName: 'John Doe', DriveLocation: 'City A', PhoneNumber: '123-456-7890' },
    { DriverID: 2, DriverName: 'Jane Smith', DriveLocation: 'City B', PhoneNumber: '987-654-3210' },
    // Add more data as needed
    
  ];
  const reservationsData = [
    { DriverID: 1, DriverName: 'John Doe', From: 'City A', Destination: 'City X', Vehicle: 'Car', Distance: '10 km', Status: 'Ongoing' },
    { DriverID: 2, DriverName: 'Jane Smith', From: 'City B', Destination: 'City Y',Vehicle: 'Car', Distance: '15 km', Status: 'Pending' },
    // Add more data as needed
  ];


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

  const handleSearch = () => {
    console.log('Searching for drivers:', { userLocation, destination, time, vehicleType });
  };

  const handleBook = () => {
    // Handle booking logic
    console.log('Booking the selected driver');
  };

  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-nowrap justify-start">
        {/* Existing code for Earnings section */}
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-start">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-85 ml-20">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <label className="text-lg font-semibold">Location</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-F3F3F3 text-gray-500"
                >
                  {/* Dropdown options */}
                </select>

                <label className="text-lg font-semibold mt-4">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-F3F3F3 text-gray-500"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-lg font-semibold">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination..."
                  className="w-full p-3 border border-gray-300 rounded-md bg-F3F3F3 placeholder-gray-500 "
                />

                <label className="text-lg font-semibold mt-4">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-F3F3F3 placeholder-gray-500 text-gray-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <label className="text-lg font-semibold">Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-F3F3F3 text-gray-500"
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Scooter">Scooter</option>
              </select>

              <Button color="white" bgColor={currentColor} text="Search" borderRadius="10px" onClick={handleSearch} />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl mr-20">
          <GridComponent
          dataSource={driversData}
          allowPaging
          allowSelection
          selectionSettings={{ type: 'Single', checkboxMode: 'ResetOnRowClick' }}
          height="300px" // Adjust the height as needed
          selectionChange={(args) => handleSelectionChange(args)}
        >
          <ColumnsDirective>
            <ColumnDirective type="checkbox" width="50" />
            <ColumnDirective field="DriverID" headerText="Driver ID" width="100" textAlign="Right" />
            <ColumnDirective field="DriverName" headerText="Driver Name" width="150" />
            <ColumnDirective field="DriveLocation" headerText="Drive Location" width="150" />
            <ColumnDirective field="PhoneNumber" headerText="Phone Number" width="150" />
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar]} />
        </GridComponent>

            <div className="mt-4">
              <Button color="white" bgColor={currentColor} text="Book" borderRadius="10px" onClick={handleBook} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-1 p-4 rounded-2xl w-1200">
          <div className="flex justify-between rounded-2xl">
            <MapContainer center={userLocation || [7.2906, 80.6337]} zoom={userLocation ? 15 : 13} style={{ width: '100%', height: '65vh', borderRadius: '10px' }}>
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
      <div className="flex gap-1 flex-wrap justify-center mt-4">
  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-1200">
    <h2 className="text-2xl font-semibold mb-4">Available Reservations</h2>
    
      <GridComponent
         dataSource={reservationsData}
         
         allowPaging
         allowSelection
         selectionSettings={{ type: 'Single', checkboxMode: 'ResetOnRowClick' }}
         height="300px" // Adjust the height as needed
         selectionChange={(args) => handleSelectionChange(args)}>
     
        <ColumnsDirective>
              <ColumnDirective field="DriverID" headerText="Driver ID" width="100" textAlign="Right" />
              <ColumnDirective field="DriverName" headerText="Driver Name" width="150" />
              <ColumnDirective field="From" headerText="From" width="150" />
              <ColumnDirective field="Destination" headerText="Destination" width="150" />
              <ColumnDirective field="Vehicle" headerText="Vehicle" width="150" />
              <ColumnDirective field="Distance" headerText="Calculated Distance" width="150" />
              <ColumnDirective
  field="Status"
  headerText="Status"
  width="150"

/>
<ColumnDirective
  headerText="Action"
  width="100"
  
/>




            </ColumnsDirective>
      </GridComponent>
      <div className="flex justify-between items-center mt-5 border-t-1 border-color">
          <div className="mt-3">
            <Button color="white" bgColor={currentColor} text="Cancel reservation" borderRadius="10px" />
          </div>
          </div>
  </div>
</div>
    </div>
  );
};

export default ReserveTaxi;
