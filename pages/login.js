import { getSession } from 'next-auth/react';

import Layout from '../components/Layout/Layout';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <Layout title='Login'>
      <Login />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default LoginPage;
