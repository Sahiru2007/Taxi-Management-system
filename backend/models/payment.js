const mongoose = require('mongoose');
const Joi = require('joi');

const PaymentSchema = new mongoose.Schema({
  stripePaymentId:{ type: String, required: true },
  reservationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  amount: {type: Number, required: true},
  status: { type: String, required: true}, 
});

const Payment = mongoose.model('Payment', PaymentSchema);



module.exports = { Payment};
