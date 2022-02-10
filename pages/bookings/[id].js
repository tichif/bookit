import { getSession } from 'next-auth/react';
import { wrapper } from '../../redux/store';

import Layout from '../../components/Layout/Layout';
import BookingDetails from '../../components/Booking/BookingDetails';
import { getBookingDetails } from '../../redux/actions/bookings';

const BookingDetailsPage = () => {
  return (
    <Layout title='My Booking'>
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req, params } = context;

    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // add req.header.cookie for auth in the backend
    await store.dispatch(getBookingDetails(req.headers.cookie, req, params.id));
  }
);

export default BookingDetailsPage;
