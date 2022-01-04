import HomeComponent from '../components/Home';
import Layout from '../components/Layout/Layout';

import { getAllRooms } from '../redux/actions/rooms';
import { wrapper } from '../redux/store';

export default function Home() {
  return (
    <Layout>
      <HomeComponent />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req, query } = context;

    await store.dispatch(
      getAllRooms(req, query.page, query.location, query.guests, query.category)
    );
  }
);
