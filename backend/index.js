// require other modules and configurations...

const express = require('express');
const router = express.Router();
const app = express();

const cors = require("cors");
const connection  = require('./db');
const userRoutes = require("./routes/passenger");
const driverRoutes = require("./routes/driver");
const authRoutes = require("./routes/auth");
const PassengerControllerRoutes = require("./routes/PassengerController");
const driverStatusRoutes = require("./routes/driverStatus"); // Import the driverStatus routes
const locationRoutes = require("./routes/location"); // Import the location routes
const driverDetails = require("./routes/driverDetails")
const reservation = require("./routes/reservation")
const reservationRequests = require("./routes/reservationRequests")
const driverCurrentRide = require("./routes/driverCurrentRide")
const passengerCurrentRide = require("./routes/passengerCurrentRide")
const rating = require("./routes/ratings")
const payments = require('./routes/payment')
const travelHistory = require('./routes/travelHistory')
const adminDashboard = require('./routes/adminDashboard')
const reservationChart = require('./routes/reservationChart')
// database connection
connection();

// middlewares
app.use(express.json())
app.use(cors());

// routes
app.use("/api/passenger", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/PassengerController", PassengerControllerRoutes);
app.use("/api/payment", payments);
// Use the driverStatus routes
app.use("/api/driverStatus/", driverStatusRoutes);

// Use the location routes
app.use("/api/location", locationRoutes);
app.use("api/driverDetails", driverDetails);
app.use("/api/reservation", reservation);

app.use("/api/reservationRequests", reservationRequests);
app.use("/api/driverCurrentRide", driverCurrentRide);
app.use("/api/passengerCurrentRide", passengerCurrentRide);
app.use("/api/travelHistory", travelHistory)
app.use("/api/rating", rating)
app.use("/api/adminDashboard", adminDashboard)
app.use("/api/reservationChart", reservationChart)










const port =  8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

