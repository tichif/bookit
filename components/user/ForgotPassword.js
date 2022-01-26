import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import ButtonLoader from '../Layout/ButtonLoader';
import { forgotUserPassword, clearError } from '../../redux/actions/users';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(
    (state) => state.userForgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(forgotUserPassword({ email }));
  };

  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-5'>
        <form className='shadow-lg' onSubmit={submitHandler}>
          <h1 className='mb-3'>Forgot Password</h1>
          <div className='form-group'>
            <label htmlFor='email_field'>Enter Email</label>
            <input
              type='email'
              id='email_field'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id='forgot_password_button'
            type='submit'
            className='btn btn-block py-3'
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
