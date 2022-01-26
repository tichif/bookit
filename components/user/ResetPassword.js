import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ButtonLoader from '../Layout/ButtonLoader';
import { resetUserPassword, clearError } from '../../redux/actions/users';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const { loading, success, error } = useSelector(
    (state) => state.userResetPassword
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      router.push('/login');
    }
  }, [dispatch, error, success, router]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      resetUserPassword(router.query.token, { password, confirmPassword })
    );
  };

  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-5'>
        <form className='shadow-lg' onSubmit={submitHandler}>
          <h1 className='mb-3'>New Password</h1>

          <div className='form-group'>
            <label htmlFor='password_field'>Password</label>
            <input
              type='password'
              id='password_field'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='confirm_password_field'>Confirm Password</label>
            <input
              type='password'
              id='confirm_password_field'
              className='form-control'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id='new_password_button'
            type='submit'
            className='btn btn-block py-3'
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
