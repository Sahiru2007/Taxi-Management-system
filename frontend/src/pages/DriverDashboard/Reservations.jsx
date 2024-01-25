import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MdOutlineCancel } from 'react-icons/md';
import { LinkButton } from '../../components/PassengerDashboard';
import { useStateContext } from '../../contexts/ContextProvider';

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
  }, {
    customerId: 'C002',
    customerName: 'Bob Smith',
    from: 'City C',
    destination: 'City D',
    time: '18:45',
    date: '2023-01-16',
    requestedVehicleType: 'SUV',
    contactNumber: '987-654-3210',
  }, {
    customerId: 'C002',
    customerName: 'Bob Smith',
    from: 'City C',
    destination: 'City D',
    time: '18:45',
    date: '2023-01-16',
    requestedVehicleType: 'SUV',
    contactNumber: '987-654-3210',
  }, {
    customerId: 'C002',
    customerName: 'Bob Smith',
    from: 'City C',
    destination: 'City D',
    time: '18:45',
    date: '2023-01-16',
    requestedVehicleType: 'SUV',
    contactNumber: '987-654-3210',
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
  }, {
    customerId: 'C002',
    customerName: 'Bob Smith',
    from: 'City C',
    destination: 'City D',
    time: '18:45',
    date: '2023-01-16',
    requestedVehicleType: 'SUV',
    contactNumber: '987-654-3210',
  }, {
    customerId: 'C002',
    customerName: 'Bob Smith',
    from: 'City C',
    destination: 'City D',
    time: '18:45',
    date: '2023-01-16',
    requestedVehicleType: 'SUV',
    contactNumber: '987-654-3210',
  }, {
    customerId: 'C002',
    customerName: 'Bob Smith',
    from: 'City C',
    destination: 'City D',
    time: '18:45',
    date: '2023-01-16',
    requestedVehicleType: 'SUV',
    contactNumber: '987-654-3210',
  },
];
const dummyReservations = [
    {
      tripId: 'T001',
      customerId: 'C001',
      name: 'Alice Doe',
      from: 'City A',
      destination: 'City B',
      distance: '100 km',
      time: '15:30',
      date: '2023-01-15',
      status: 'Finished',
    },
    {
      tripId: 'T002',
      customerId: 'C002',
      name: 'Bob Smith',
      from: 'City C',
      destination: 'City D',
      distance: '150 km',
      time: '18:45',
      date: '2023-01-16',
      status: 'Ongoing',
    },
    {
      tripId: 'T003',
      customerId: 'C003',
      name: 'Charlie Brown',
      from: 'City E',
      destination: 'City F',
      distance: '120 km',
      time: '12:00',
      date: '2023-01-17',
      status: 'Cancelled',
    },
  ];
  
const Reservation= () => {
  const { currentColor } = useStateContext();
  const [userLocation, setUserLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sortedData, setSortedData] = useState(dummyReservations);
  const [sortOrder, setSortOrder] = useState({
    column: null,
    ascending: true,
  });
  
  useEffect(() => {
    // You can fetch or update data here
  }, []);  // Add dependencies if needed
  
  const sortStringColumn = (columnName, isAscending) => {
    return [...sortedData].sort((a, b) => {
      const aValue = String(a[columnName]).toLowerCase();
      const bValue = String(b[columnName]).toLowerCase();
      return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  };

  const sortDateTimeColumn = (columnName, isAscending) => {
    return [...sortedData].sort((a, b) => {
      return isAscending
        ? new Date(a[columnName]).getTime() - new Date(b[columnName]).getTime()
        : new Date(b[columnName]).getTime() - new Date(a[columnName]).getTime();
    });
  };

  const handleSort = (columnName) => {
    const isAscending = sortOrder.column === columnName && sortOrder.ascending;

    let sorted;
    if (columnName === 'time' || columnName === 'date') {
      sorted = sortDateTimeColumn(columnName, isAscending);
    } else {
      sorted = sortStringColumn(columnName, isAscending);
    }

    setSortedData(sorted);
    setSortOrder({
      column: columnName,
      ascending: !isAscending,
    });
  };
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
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = sortedData.filter((reservation) =>
    Object.values(reservation).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );
  return (
    <div className="mt-10">
    

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-1200 max-h-[600px] overflow-y-auto pb-10">
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
          </div>

          
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center mt-20">
        {/* New table for Reservations */}
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-1200 max-h-[384px] overflow-y-auto">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Reservations</p>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="table-container">
            <table className="w-full mt-6">
              <thead>
                <tr>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('tripId')}
                  >
                    Trip ID
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('customerId')}
                  >
                    Customer ID
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('from')}
                  >
                    From
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('destination')}
                  >
                    Destination
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('distance')}
                  >
                    Distance
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('time')}
                  >
                    Time
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('date')}
                  >
                    Date
                  </th>
                  <th
                    className="text-left px-5 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto max-h-[300px]">
                {filteredData.map((reservation, index) => (
                  <tr key={reservation.tripId} className={index === 0 ? '' : 'border-none'}>
                    <td className="px-5 py-4">{reservation.tripId}</td>
                    <td className="px-5 py-2">{reservation.customerId}</td>
                    <td className="px-5 py-2">{reservation.name}</td>
                    <td className="px-5 py-2">{reservation.from}</td>
                    <td className="px-5 py-2">{reservation.destination}</td>
                    <td className="px-5 py-2">{reservation.distance}</td>
                    <td className="px-5 py-2">{reservation.time}</td>
                    <td className="px-5 py-2">{reservation.date}</td>
                    <td className="px-5 py-2">
                      {reservation.status === 'Finished' && (
                        <span className="text-green-500 font-bold">● {reservation.status}</span>
                      )}
                      {reservation.status === 'Ongoing' && (
                        <span className="text-yellow-500 font-bold">● {reservation.status}</span>
                      )}
                      {reservation.status === 'Cancelled' && (
                        <span className="text-red-500 font-bold">● {reservation.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Other components or content */}
    </div>
  );
};

export default Reservation;
