import React from 'react';

import RoomDetail from '../../components/Room/RoomDetail';
import Layout from '../../components/Layout/Layout';

import { getRoomDetail } from '../../redux/actions/rooms';
import { wrapper } from '../../redux/store';

const Detail = () => {
  return (
    <Layout title='Room Details'>
      <RoomDetail />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req, params } = context;

    await store.dispatch(getRoomDetail(req, params.id));
  }
);

export default Detail;
