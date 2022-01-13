import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';

import logo from '../../public/images/bookit_logo.png';
import { getUserProfile } from '../../redux/actions/users';

const Header = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.userLoad);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className='navbar row justify-content-center sticky-top'>
      <div className='container'>
        <div className='col-3 p-0'>
          <div className='navbar-brand'>
            <Link href='/'>
              <a>
                <Image alt='Book It' src={logo} className='logo' />
              </a>
            </Link>
          </div>
        </div>

        <div className='col-3 mt-3 mt-md-0 text-center'>
          {user ? (
            <div className='ml-4 dropdown d-inline'>
              <a
                className='btn dropdown-toggle mr-4'
                id='dropDownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <figure className='avatar avatar-nav'>
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className='rounded-circle'
                  />
                </figure>
                <span>{user && user.name}</span>
              </a>
              <div
                className='dropdown-menu'
                arial-labelledby='dropDownMenuButton'
              >
                <Link href='/bookings/me'>
                  <a className='dropdown-item'>My Bookings</a>
                </Link>
                <Link href='/me/update'>
                  <a className='dropdown-item'>Profile</a>
                </Link>
                <Link href='/logout'>
                  <a
                    onClick={logoutHandler}
                    className='dropdown-item text-danger'
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href='/login'>
                <a className='btn btn-danger px-4 text-white login-header-btn float-right'>
                  Login
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
