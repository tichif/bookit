import { getSession } from 'next-auth/react';
import { wrapper } from '../../redux/store';

import Layout from '../../components/Layout/Layout';
import MyBooking from '../../components/Booking/MyBooking';
import { getMyBookings } from '../../redux/actions/bookings';

const MyBookingPage = () => {
  return (
    <Layout title='My Booking'>
      <MyBooking />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req } = context;

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
    await store.dispatch(getMyBookings(req.headers.cookie, req));
  }
);

export default MyBookingPage;
