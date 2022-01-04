import HomeComponent from '../components/Home';
import Layout from '../components/Layout/Layout';

import { wrapper } from '../redux/store';
import Search from '../components/Search';

const search = () => {
  return (
    <Layout title='Search Rooms'>
      <Search />
    </Layout>
  );
};

export default search;
