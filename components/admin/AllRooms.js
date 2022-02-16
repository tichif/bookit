import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
import { useRouter } from 'next/router';

import Loader from '../Layout/Loader';
import { getAllRoomsForAdmin } from '../../redux/actions/rooms';
import { clearError } from '../../redux/actions/rooms';

const AllRooms = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { loading, error, rooms } = useSelector((state) => state.allRooms);

  useEffect(() => {
    dispatch(getAllRoomsForAdmin());

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: 'Room Id',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price Per Night',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    rooms &&
      rooms.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.price}`,
          category: room.category,
          actions: (
            <>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className='btn btn-primary'>
                  <i className='fa fa-pencil'></i>
                </a>
              </Link>
              <button className='btn btn-danger mx-2'>
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <div className='container container-fluid'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className='my-5'>
            {rooms && rooms.length}{' '}
            {rooms && rooms.length === 1 ? 'Room' : 'Rooms'}
          </h1>
          <MDBDataTable
            data={setRooms()}
            className='px-3'
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllRooms;
