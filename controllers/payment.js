import absoluteUrl from 'next-absolute-url';
import Stripe from 'stripe';
import getRawBody from 'raw-body';

import Room from '../models/Room';
import User from '../models/User';
import Booking from '../models/Booking';
import asyncHandler from '../middlewares/asyncHandler';
import ApiFeatures from '../utils/apiFeatures';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @path    GET /api/checkout_session/:roomId
// @desc    Create Stripe Checkout Session
// @access  Private
export const stripeCheckoutSession = asyncHandler(async (req, res) => {
  // Get room details
  const room = await Room.findById(req.query.roomId);

  const { checkInDate, checkOutDate, dayOfStay } = req.query;

  // create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${absoluteUrl(req).origin}/bookings/me`,
    cancel_url: `${absoluteUrl(req).origin}/roms/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: {
      checkInDate,
      checkOutDate,
      dayOfStay,
    },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

// @path    POST /api/webhook
// @desc    Create new booking after payment
// @access  Private
export const webhookCheckout = asyncHandler(async (req, res) => {
  const rawBody = await getRawBody(req);
  try {
    const signature = req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = req.user._id;
      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };
      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const dayOfStay = session.metadata.dayOfStay;

      await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        dayOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      return res.status(201).json({
        success: true,
      });
    }
  } catch (error) {
    console.log('Error in Stripe CHeckout Payment:', error);
  }
});
