import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import {createGlobalReviewAction} from '../../store/reviewUsSlice'
function ReviewUs()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { userAuth } = useSelector(state => state.users)
  const [review,setReview] = useState('')
  const [rating, setRating] = useState(0)
  const addreviewHandler = e =>
  {
    e.preventDefault()
    const reviewData = { review, rating }
    console.log(reviewData)
    dispatch(createGlobalReviewAction(reviewData))
  }
  useEffect(() => {
    if (!userAuth?._id) {
      router.push('/')
    }
  }, [userAuth?._id])
  
  return (
    <div className='reviewUs'>
      <div className="reviewUs__wrapper">
        <div className="reviewUs__wrapper__header"> review us </div>
        <div className="reviewUs__wrapper__txt"> tell us about your experience with our website </div>
        <form className="reviewUs__wrapper__form" onSubmit={e => addreviewHandler(e)}>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              onChange={(e) => setReview(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">write your review</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="number"
              onChange={(e) => setRating(e.target.value)}
              max={5}
              min={0}
            />
            <label htmlFor="floatingInputCustom">write your rating</label>
          </Form.Floating>
          <input type="submit" className='reviewUs__wrapper__form__submit'/>
        </form>
      </div>
    </div>
  )
}

export default ReviewUs