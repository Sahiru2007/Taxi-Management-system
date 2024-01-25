const mongoose = require('mongoose');
const Joi = require('joi');

const reservationSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  driverName: { type: String, required: true },
  driverContactNumber: { type: String, required: true },  
  vehicleType: { type: String, required: true },
  vehicleMake: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleRegistrationNumber: { type: String, required: true },
  passengerId: { type: mongoose.Schema.Types.Mixed, required: true },

  passengerName: { type: String, required: true },
  passengerContactNumber: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  pickupCoordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  destination: { type: String, required: true },
  destinationCoordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  distance: { type: String, required: true },
  duration: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, default: Date.now }, 
  status: { type: String, enum: ['Requested', 'OnGoing', 'Completed', 'Canceled' , 'Declined'], default: 'Requested' },
  totalPayment: { type: Number, default: 0 }, 
  rating: {type: Number, default: 0},
  paymentStatus: {type:String, default: 'Pending'}
});

const Reservation = mongoose.model('Reservation', reservationSchema);

const validateReservation = (data) => {
  const schema = Joi.object({
    driverId: Joi.string().required().label('Driver ID'),
    passengerId: Joi.string().required().label('Passenger ID'),
    pickupLocation: Joi.string().required().label('Pickup Location'),
    pickupCoordinates: Joi.object({
      lat: Joi.number().required().label('Pickup Latitude'),
      lng: Joi.number().required().label('Pickup Longitude'),
    }).required(),
    destination: Joi.string().required().label('Destination'),
    destinationCoordinates: Joi.object({
      lat: Joi.number().required().label('Destination Latitude'),
      lng: Joi.number().required().label('Destination Longitude'),
    }).required(),
    distance: Joi.string().required().label('Distance'),
    duration: Joi.string().required().label('Duration'),
    status: Joi.string().valid('Requested', 'Confirmed', 'Completed', 'Canceled').default('Requested'),
  });

  return schema.validate(data);
};

module.exports = { Reservation, validateReservation };
