
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51OaK8GIHxKiWcbbgdRni8thFOC87zrMpUvVWI3jO7NzRwZxTkXH8DoetlTkFtCjcLOV7kVPedhaVTCKeYpPHJDsn009abD70oQ');
const {  Reservation } = require('../models/reservation');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const {Payment} = require('../models/payment')
router.use('/webhook', bodyParser.raw({ type: 'application/json' }));

let reservationid;
const accountSid = 'AC15d3e67d0e267fa96f88926a9cca49fa';
const authToken = 'c070d6c3cf9142695288c6b85813831e'
const twilioPhoneNumber = '+15028222264';const client = new twilio(accountSid, authToken);
// Middleware to initialize session
router.use((req, res, next) => {
  if (!req.session) {
    req.session = {}; // Initialize session if not already done
  }
  next();
});

router.post('/', async (req, res) => {
  const { reservation } = req.body;
    reservationid = reservation.id
  try {
    if (!reservation || !reservation.amount) {
      throw new Error('Invalid reservation data');
    }
    const existingReservation = await Reservation.findById(reservationid);

    if (!existingReservation || existingReservation.paymentStatus === 'Completed') {
      // If reservation does not exist or payment has already been made, return an error
      return res.status(400).json({ error: 'Payment has already been made for this reservation.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'lkr',
            product_data: {
              name: 'City Taxi Payment',
            },
            unit_amount: reservation.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/passenger/Current-ride?paymentSuccess=true',
      cancel_url: 'http://localhost:3000/',
      metadata: {
        reservationId: reservation._id,
      },
    });

    // Store the reservation ID and payment status in the session metadata
    req.session.reservationId = reservation._id;
    req.session.paymentStatus = 'Completed';

    res.json({ id: session.id });

    
  } catch (error) {
    console.error('Error:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

router.post('/webhook', express.json({type: 'application/json'}), async (request, response) => {
    const event = request.body;
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        
        const paymentIntent = event.data.object;
    
        const paymentIntentId = paymentIntent.id;
        const amountReceived = paymentIntent.amount_received;
        const amount = amountReceived/100
        console.log(paymentIntentId)
        console.log(amount)
// Use paymentIntentId as needed in your code
console.log('Payment Intent ID:', paymentIntentId);

        try {
        // Update the reservation status to 'completed'
        const Reservations = await Reservation.findById(reservationid);
        console.log(reservationid)
            console.log(Reservations)
        if (!Reservations) {
          return response.status(404).json({ message: 'Driver not found' });
        }
        const status = "Completed"

        
        // Update the user status
        Reservations.paymentStatus = "Completed" ;
        await Reservations.save();

        const newPayment = new Payment({
            stripePaymentId: paymentIntentId,
            reservationId: reservationid,
            amount: amount,
            status: "Completed",
          });
          await newPayment.save();

        console.log('Reservation status updated to completed');
        const passengerContact = Reservations.passengerContactNumber;
        const passengerMessage = `Your payment has successfully recieved. Thank you for choosing City Taxi!`;
        await sendSMS(passengerContact, passengerMessage);
        console.log(passengerContact)

        const driverContact = Reservations.driverContactNumber;
        console.log(driverContact)
        const driverMessage = 'You have successfully recieved the payment for the current ride.'
        await sendSMS(driverContact, driverMessage);

      } catch (updateError) {
        console.error('Error updating reservation status:', updateError.message);
      }
      case 'payment_intent.created':
        break;
        
    
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a response to acknowledge receipt of the event
    response.json({received: true});
  });
  async function sendSMS(to, message) {
  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });
    console.log('SMS sent successfully.');
  } catch (err) {
    console.error('Error sending SMS:', err);
  }
}

router.get('/admin', async (req, res) => {
    try {
      // Fetch all drivers from the database with selected fields
      const drivers = await Payment.find({}, 'stripePaymentId  reservationId amount status ');
  
      // Respond with the driver details
      res.status(200).json(drivers);
    } catch (error) {
      console.error('Error getting driver details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;





