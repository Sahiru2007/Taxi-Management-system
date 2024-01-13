import React, { useState, useEffect } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import { MdOutlineCancel } from "react-icons/md";
import { Stacked, Pie, Button, LinkButton, LineChart, SparkLine } from '../../components/PassengerDashboard';
import { useStateContext } from '../../contexts/ContextProvider';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
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
import { FaRegStar } from "react-icons/fa";
 
const dropdownData = [
  {
    Id: '1',
    Time: 'March 2021',
  },
  {
    Id: '2',
    Time: 'April 2021',
  }, {
    Id: '3',
    Time: 'May 2021',
  },
];
const dummyPassengerRequests = [
  {
    customerId: 'C001',
    customerName: 'Alice Doe',
    from: 'City A',
    destination: 'City B',
    time: '15:30',
    date: '2023-01-15',
    requestedVehicleType: 'Sedan',
    contactNumber: '123-456-7890',
  },
  {
    customerId: 'C002',
    customerName: 'Bob Smith',
    from: 'City C',
    destination: 'City D',
    time: '18:45',
    date: '2023-01-16',
    requestedVehicleType: 'SUV',
    contactNumber: '987-654-3210',
  }
];
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const DriverDashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const [userLocation, setUserLocation] = useState(null); // Correct usage of useState
  useEffect(() => {
    // Use browser's geolocation API to get the user's location
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
  }, [])
  const earningData = [
    {
      icon: <MdCardTravel />,
      amount: '18',
      
      title: 'No of Trips',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <FaCarSide />,
      amount: '48km',
      title: 'Total Distance Drived',
      iconBg: 'rgb(255, 244, 229)',
      iconColor: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
   
    {
      icon: <SlCalender />,
      amount: '13/04/24, 15:00',
      title: 'Next Hire',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
    {
      icon: <FaRegStar />,
      amount: '4.3',
      title: 'Average rating',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
      pcColor: 'green-600',
    },
  ];

  const recentTransactions = [
    {
      icon: <BsCurrencyDollar />,
      amount: '+$350',
      title: 'Paypal Transfer',
      desc: 'Money Added',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'green-600',
    },
    // Add other recentTransactions data
  ];
   const SparklineAreaData = [
    { x: 1, yval: 2 },
    { x: 2, yval: 6 },
    { x: 3, yval: 8 },
    { x: 4, yval: 5 },
    { x: 5, yval: 10 },
  
  ];
  const ecomPieChartData = [
    { x: '2018', y: 18, text: '35%' },
    { x: '2019', y: 18, text: '15%' },
    { x: '2020', y: 18, text: '25%' },
    { x: '2021', y: 18, text: '25%' },
  ];
 

  const weeklyStats = [
    {
      icon: <FiStar />,
      amount: '31',
      title: 'Johnathan Doe',
      iconBg: '#00C292',
      pcColor: 'green-600',
    },
    // Add other weeklyStats data
  ];

  // Add other dummy data if needed

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Current Passenger</p>
              <p className="text-2xl">Joe Mama</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
             <FaCarSide />
            </button>
          </div>
          <div className="mt-6">
            <LinkButton
            to={'/passenger/Current-ride'}
              color="white"
              bgColor={currentColor}
              text="View Current Ride"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 m-4 flex-wrap justify-center">
  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-1200 max-h-[384px] overflow-y-auto">
    <div className="flex justify-between items-center gap-2">
      <p className="text-xl font-semibold">Reservation Requests</p>
    </div>

    <div className="table-container">
      <table className="w-full mt-6">
        <thead>
          <tr>
            <th className="text-left px-5 py-2">Customer ID</th>
            <th className="text-left px-5 py-2">Customer Name</th>
            <th className="text-left px-5 py-2">From</th>
            <th className="text-left px-5 py-2">Destination</th>
            <th className="text-left px-5 py-2">Time</th>
            <th className="text-left px-5 py-2">Date</th>
            <th className="text-left px-5 py-2">Contact Number</th>
            <th className="text-left px-5 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto max-h-[300px]">
          {dummyPassengerRequests.map((request, index) => (
        <tr key={request.customerId} className={index === 0 ? '' : 'border-none'}>
          <td className="px-5 py-4">{request.customerId}</td>
          <td className="px-5 py-2">{request.customerName}</td>
          <td className="px-5 py-2">{request.from}</td>
          <td className="px-5 py-2">{request.destination}</td>
          <td className="px-5 py-2">{request.time}</td>
          <td className="px-5 py-2">{request.date}</td>
          <td className="px-5 py-2">{request.contactNumber}</td>
          <td className="flex items-center gap-2">
            {/* Add buttons for accepting or declining */}
            <button
              type="button"
              className="flex items-center text-green-600 px-3 py-2 bg-green-100 rounded-full opacity-70 hover:opacity-100"
            >
              <CiCirclePlus size={16} className="mr-1" />
              Accept
            </button>
            <button
              type="button"
              className="flex items-center text-red-600 px-3 py-2 bg-red-100 rounded-full opacity-70 hover:opacity-100"
            >
              <MdOutlineCancel size={16} className="mr-1" />
              Decline
            </button>
          </td>
        </tr>
      ))}
    </tbody>

    </table>
    <div className="flex justify-between items-center mt-5 border-t-1 border-color">
      <div className="mt-3">
        <LinkButton
          to={'/passenger/My-Travel-History'}
          color="white"
          bgColor={currentColor}
          text="View all Reservations"
          borderRadius="10px"
        />
      </div>
    </div>
  </div>
</div>
</div>

      <div className="flex gap-10 flex-wrap justify-center">
       <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl  w-1200">
          <div className="flex justify-between rounded-2xl">
            <MapContainer center={userLocation || [7.2906, 80.6337]} zoom={userLocation ? 15 : 13} style={{ width: '100%', height: '48vh', borderRadius: '10px' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {userLocation && (
                <Marker position={userLocation}>
                  <Popup>Your Location</Popup>
                  <IoLocationSharp size={24} color="blue" />
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>

        
      </div>

     

      
    </div>
  );
};

export default DriverDashboard;
