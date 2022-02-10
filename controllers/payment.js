import absoluteUrl from 'next-absolute-url';
import Stripe from 'stripe';

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
