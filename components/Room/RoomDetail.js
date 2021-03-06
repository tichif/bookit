import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { Carousel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useRouter } from 'next/router';

import { clearError } from '../../redux/actions/rooms';
import RoomFeatures from './RoomFeatures';
import {
  checkBookingAvailability,
  getBookedDates,
} from '../../redux/actions/bookings';
import { CHECK_BOOKING_RESET } from '../../redux/constants/booking';
import getStripe from '../../utils/getStripe';
import NewReview from '../review/NewReview';
import ListReview from '../review/ListReview';

const RoomDetail = () => {
  const { room, error } = useSelector((state) => state.roomDetail);

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [dayOfStay, setDayOfStay] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const { available, loading } = useSelector((state) => state.checkBooking);

  const { dates } = useSelector((state) => state.bookedDates);

  const excludedDates = [];
  dates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  const { user } = useSelector((state) => state.userLoad);

  const bookRoom = async (id, pricePerNite) => {
    setPaymentLoading(true);

    const amount = pricePerNite * dayOfStay;
    try {
      const link = `/api/checkout_session/${id}?amount=${amount}&checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&dayOfStay=${dayOfStay}`;

      const { data } = await axios.get(link);

      const stripe = await getStripe();

      // Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.id });

      setPaymentLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getBookedDates(router.query.id));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    return () => {
      dispatch({ type: CHECK_BOOKING_RESET });
    };
  }, [error, dispatch, router]);

  const onChangeHandler = (dates) => {
    const [checkIn, checkOut] = dates;
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);

    if (checkIn && checkOut) {
      // Calculate day of stay
      const days = Math.floor(
        (new Date(checkOut) - new Date(checkIn)) / 86400000 + 1
      ); // 60 * 60 * 24 * 1000
      setDayOfStay(days);

      dispatch(
        checkBookingAvailability(
          router.query.id,
          checkIn.toISOString(),
          checkOut.toISOString()
        )
      );
    }
  };

  const newBookingHandler = async () => {
    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      dayOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: 'stripe',
        status: 'paid',
      },
      paidAt: new Date(),
    };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/bookings', bookingData, config);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{room.name}</title>
      </Head>
      <div className='container container-fluid'>
        <h2 className='mt-5'>{room.name}</h2>
        <p>{room.address}</p>

        <div className='ratings mt-auto mb-3'>
          <div className='rating-outer'>
            <div
              className='rating-inner'
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id='no_of_reviews'>({room.numOfReviews} Reviews)</span>
        </div>

        <Carousel hover='pause'>
          {room &&
            room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image._id}>
                <div style={{ width: '100%', height: '440px' }}>
                  <Image
                    className='d-block m-auto'
                    src={image.url}
                    alt={room.name}
                    layout='fill'
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className='row my-5'>
          <div className='col-12 col-md-6 col-lg-8'>
            <h3>Description</h3>
            <p>{room.description}</p>

            <RoomFeatures room={room} />
          </div>

          <div className='col-12 col-md-6 col-lg-4'>
            <div className='booking-card shadow-lg p-4'>
              <p className='price-per-night'>
                <b>${room.price}</b> / night
              </p>

              <hr />

              <p className='mt-5 mb-3'>Pick Check In & Check Out</p>
              <DatePicker
                className='w-100'
                selected={checkInDate}
                onChange={onChangeHandler}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              {available === true && (
                <div className='alert alert-success my-3 font-weight-bold'>
                  Room is available. Book Now
                </div>
              )}

              {available === false && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Room is not available. Try different dates
                </div>
              )}

              {available && !user && (
                <div className='alert alert-danger my-3 font-weight-bold'>
                  Login to book this room.
                </div>
              )}

              {available && user && (
                <button
                  disabled={paymentLoading || loading ? true : false}
                  className='btn btn-block py-3 booking-btn'
                  onClick={() => bookRoom(room._id, room.price)}
                >
                  Pay - ${dayOfStay * room.price}
                </button>
              )}
            </div>
          </div>
        </div>

        <NewReview />
        {room.reviews && room.reviews.length > 0 ? (
          <ListReview reviews={room.reviews} />
        ) : (
          <p>
            <b>No reviews for this room</b>
          </p>
        )}
      </div>
    </>
  );
};

export default RoomDetail;
