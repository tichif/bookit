import { getSession } from 'next-auth/react';

import NewRoom from '../../../components/admin/NewRoom';
import Layout from '../../../components/Layout/Layout';

const RoomCreatePage = () => {
  return (
    <Layout title='Create Room - Admin'>
      <NewRoom />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default RoomCreatePage;
