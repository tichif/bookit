import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='page-not-found-wrapper'>
      <h1 id='title_404'>404</h1>
      <h3 id='description_404'>
        Page not found. Go to <Link href='/'>Go to homepage</Link>
      </h3>
    </div>
  );
};

export default NotFound;
