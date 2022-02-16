import { getSession } from 'next-auth/react';

import UpdateRoom from '../../../components/admin/UpdateRoom';
import Layout from '../../../components/Layout/Layout';

const RoomUpdatePage = () => {
  return (
    <Layout title='Update Room - Admin'>
      <UpdateRoom />
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

export default RoomUpdatePage;
