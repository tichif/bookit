import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { createReview, clearError } from '../../redux/actions/rooms';
import { CREATE_REVIEW_RESET } from '../../redux/constants/rooms';

const NewReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, success } = useSelector((state) => state.createReview);

  const { id } = router.query;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      toast.success('Review is posted successfully.');
      dispatch({ type: CREATE_REVIEW_RESET });
    }
  }, [dispatch, error, success]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId: id,
    };
    dispatch(createReview(reviewData));
  };

  const setUserRating = () => {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, i) => {
      star.starValue = i + 1;

      // set event
      ['click', 'mouseover', 'mouseout'].forEach((e) => {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, i) => {
        if (e.type === 'click') {
          if (i < this.starValue) {
            star.classList.add('red');
            setRating(this.starValue);
          } else {
            star.classList.remove('red');
          }
        }

        if (e.type === 'mouseover') {
          if (i < this.starValue) {
            star.classList.add('light-red');
          } else {
            star.classList.remove('light-red');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('light-red');
        }
      });
    }
  };

  return (
    <div className='container'>
      <div className='row d-flex justify-content-between'>
        <button
          id='review_btn'
          type='button'
          className='btn btn-primary mt-4 mb-5'
          data-toggle='modal'
          data-target='#ratingModal'
          onClick={setUserRating}
        >
          Submit Your Review
        </button>

        <div
          className='modal fade'
          id='ratingModal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='ratingModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='ratingModalLabel'>
                  Submit Review
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <ul className='stars'>
                  <li className='star'>
                    <i className='fa fa-star'></i>
                  </li>
                  <li className='star'>
                    <i className='fa fa-star'></i>
                  </li>
                  <li className='star'>
                    <i className='fa fa-star'></i>
                  </li>
                  <li className='star'>
                    <i className='fa fa-star'></i>
                  </li>
                  <li className='star'>
                    <i className='fa fa-star'></i>
                  </li>
                </ul>

                <textarea
                  name='review'
                  id='review'
                  className='form-control mt-3'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button
                  className='btn my-3 float-right review-btn px-4 text-white'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReview;
