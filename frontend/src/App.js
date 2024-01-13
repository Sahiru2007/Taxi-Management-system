import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import UserType from './pages/userType';
import DriverSignUp from './pages/driverSignup';
import PassengerDashboard from './pages/PassengerDashboard/PassengerDashboard';
import PassengerDashboardLayout from './PassengerLayout';
import { AdminDashboard, Reservations, Drivers, Users, LiveLocation } from './pages/AdminDashboard';
import ReserveTaxi from './pages/PassengerDashboard/ReserveTaxi';
import CurrentRide from  './pages/PassengerDashboard/CurrentRide';
import TravelHistory from './pages/PassengerDashboard/TravelHistory'
import DriverDashboardLayout from './DriverLayout'
import DriverDashboard from './pages/DriverDashboard/DriverDashboard'
import Reservation from './pages/DriverDashboard/Reservations'
import DriverCurrrentRide from './pages/DriverDashboard/CurrentRide'
import Earning from './pages/DriverDashboard/Earning'
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Common routes */}
        <Route path="/" element={<Home />} />
        <Route path="/userType" element={<UserType />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver_signup" element={<DriverSignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <DashboardLayout>
              <Routes>
              <Route path="/" element={<AdminDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/users" element={<Users />} />
                <Route path="/live-location" element={<LiveLocation />} />
                {/* Add other admin routes here */}
              </Routes>
            </DashboardLayout>
          }
        />

        {/* Passenger routes */}
        <Route
          path="/passenger/*"
          element={
            <PassengerDashboardLayout>
              <Routes>
              <Route path="/" element={<PassengerDashboard />} />
                <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
                <Route path="/reserve-taxi" element={<ReserveTaxi />} />
                <Route path="/current-ride" element={<CurrentRide />} />
                <Route path="/my-travel-history" element={<TravelHistory />} />
              </Routes>
            </PassengerDashboardLayout>
          }
        />
         {/* driver routes */}
         <Route
          path="/driver/*"
          element={
            <DriverDashboardLayout>
              <Routes>
              <Route path="/" element={<DriverDashboard />} />
                <Route path="/driver-dashboard" element={<DriverDashboard />} />
                <Route path="/reservations" element={<Reservation />} />
                <Route path="/current-ride" element={<DriverCurrrentRide />} />
                <Route path="/earning" element={<Earning />} />
                
              </Routes>
            </DriverDashboardLayout>
          }
        />
      </Routes>
      
      
    </BrowserRouter>
  );
};

export default App;
