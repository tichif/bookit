import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../Layout/Loader';
import { createRoom, clearError } from '../../redux/actions/rooms';
import { CREATE_ROOM_RESET } from '../../redux/constants/rooms';

const NewRoom = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('King');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [guestCapacity, setGuestCapacity] = useState(1);
  const [numOfBeds, setNumOfBeds] = useState(1);
  const [internet, setInternet] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [airConditioned, setAirConditioned] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [roomCleaning, setRoomCleaning] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreviewed, setImagesPreviewed] = useState([]);

  const { loading, error, success, room } = useSelector(
    (state) => state.createRoom
  );

  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      dispatch({ type: CREATE_ROOM_RESET });
      router.push('/admin/rooms');
    }
  }, [dispatch, error, router, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const room = {
      name,
      description,
      category,
      price: Number(price),
      numOfBeds: Number(numOfBeds),
      guestCapacity: Number(guestCapacity),
      internet,
      roomCleaning,
      address,
      petsAllowed,
      airConditioned,
      images,
      breakfast,
    };

    if (images.length === 0) {
      return toast.error('Please upload images');
    }
    dispatch(createRoom(room));
  };

  const onChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    // reset images state each times user choose image
    setImages([]);
    setImagesPreviewed([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevState) => {
            return [...prevState, reader.result];
          });
          setImagesPreviewed((prevState) => {
            return [...prevState, reader.result];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='container container-fluid'>
      <div className='row wrapper'>
        <div className='col-10 col-lg-8'>
          <form
            className='shadow-lg'
            onSubmit={submitHandler}
            encType='multipart/form-data'
          >
            <h1 className='mb-4'>New Room</h1>
            <div className='form-group'>
              <label htmlFor='name_field'>Name</label>
              <input
                type='text'
                id='name_field'
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price_field'>Price</label>
              <input
                type='text'
                id='price_field'
                className='form-control'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description_field'>Description</label>
              <textarea
                className='form-control'
                id='description_field'
                rows='8'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className='form-group'>
              <label htmlFor='address_field'>Address</label>
              <input
                type='text'
                id='address_field'
                className='form-control'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='category_field'>Category</label>
              <select
                className='form-control'
                id='category_field'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {['King', 'Single', 'Twins'].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='category_field'>Guest Capacity</label>
              <select
                className='form-control'
                id='guestCapacity_field'
                value={guestCapacity}
                onChange={(e) => setGuestCapacity(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='category_field'>Number of Beds</label>
              <select
                className='form-control'
                id='numOfBeds_field'
                value={numOfBeds}
                onChange={(e) => setNumOfBeds(e.target.value)}
              >
                {[1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <label className='mb-3'>Room Features</label>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='internet_checkbox'
                value={internet}
                onChange={(e) => setInternet(e.target.checked)}
              />
              <label className='form-check-label' htmlFor='internet_checkbox'>
                Internet
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='breakfast_checkbox'
                value={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
              />
              <label className='form-check-label' htmlFor='breakfast_checkbox'>
                Breakfast
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='airConditioned_checkbox'
                value={airConditioned}
                onChange={(e) => setAirConditioned(e.target.checked)}
              />
              <label
                className='form-check-label'
                htmlFor='airConditioned_checkbox'
              >
                Air Conditioned
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='petsAllowed_checkbox'
                value={petsAllowed}
                onChange={(e) => setPetsAllowed(e.target.checked)}
              />
              <label
                className='form-check-label'
                htmlFor='petsAllowed_checkbox'
              >
                Pets Allowed
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='roomCleaning_checkbox'
                value={roomCleaning}
                onChange={(e) => setRoomCleaning(e.target.checked)}
              />
              <label
                className='form-check-label'
                htmlFor='roomCleaning_checkbox'
              >
                Room Cleaning
              </label>
            </div>
            <div className='form-group mt-4'>
              <label>Images</label>
              <div className='custom-file'>
                <input
                  type='file'
                  name='room_images'
                  className='custom-file-input'
                  id='customFile'
                  multiple
                  onChange={onChangeHandler}
                />
                <label className='custom-file-label' htmlFor='customFile'>
                  Choose Images
                </label>
              </div>
              {imagesPreviewed &&
                imagesPreviewed.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt='Images Preview'
                    className='mt-3 mr-2'
                    width='55'
                    height='52'
                  />
                ))}
            </div>
            <button
              type='submit'
              disabled={loading ? true : false}
              className='btn btn-block new-room-btn py-3'
            >
              {loading ? <Loader /> : 'CREATE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
