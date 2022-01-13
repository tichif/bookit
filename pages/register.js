import { getSession } from 'next-auth/react';

import Layout from '../components/Layout/Layout';
import Register from '../components/auth/Register';

const RegisterPage = () => {
  return (
    <Layout title='Register'>
      <Register />
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

export default RegisterPage;
