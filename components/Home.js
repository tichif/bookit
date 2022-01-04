import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useRouter } from 'next/router';
import Link from 'next/link';

import RoomItem from './Room/RoomItem';
import { clearError } from '../redux/actions/rooms';

const Home = () => {
  const allRooms = useSelector((state) => state.allRooms);
  const { rooms, error, resultsPerPage, roomsCount, filteredRoomsCount } =
    allRooms;

  const dispatch = useDispatch();

  const { page } = Number(useRouter().query);
  const { location } = useRouter().query;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handlePagination = (curPage) => {
    window.location.href = `/?page=${curPage}`;
  };

  let count = roomsCount;
  if (location) {
    count = filteredRoomsCount;
  }

  return (
    <>
      <section id='rooms' className='container mt-5'>
        <h2 className='mb-3 ml-2 stays-heading'>
          {location ? `Rooms in ${location}` : 'All Rooms'}
        </h2>

        <Link href='/search'>
          <a className='ml-2 back-to-search'>
            {' '}
            <i className='fa fa-arrow-left'></i> Back to Search
          </a>
        </Link>
        <div className='row'>
          {rooms && rooms.length === 0 ? (
            <div className='alert alert-danger'>
              <b>No rooms found</b>
            </div>
          ) : (
            rooms &&
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
        {resultsPerPage < count && (
          <div className='d-flex justify-content-center mt-5'>
            <Pagination
              activePage={page}
              itemsCountPerPage={resultsPerPage}
              totalItemsCount={roomsCount}
              onChange={handlePagination}
              nextPageText={'Next'}
              prevPageText={'Previous'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
