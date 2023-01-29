import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryDetailsAction, updateCategoryAction, reset } from '../../../store/categorySlice'
function EditCategory()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const { categoryDetails,loading,isUpdated } = useSelector(state => state.category)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  
  const submitHandler = () =>
  {
    const catData = {
      id, data: { title, image }
    }
    dispatch(updateCategoryAction(catData))
  }
  useEffect(() =>
  {
    dispatch(fetchCategoryDetailsAction(id))
  }, [])

  useEffect(() =>
  {
    if (categoryDetails)
    {
      setTitle(categoryDetails?.title)
      setImage(categoryDetails?.images[0]?.url)
      setImagePreview(categoryDetails?.images[0]?.url)
    }
  }, [categoryDetails])
  if (isUpdated) {
    router.push('/dashboard/category')
    dispatch(reset())
  }
  return (
    <div className='dashboard__container__editCategory__wrapper'>
      {loading ? (
        <>
          <Spinner animation="border" variant="danger" size='sm' />
        </>
      ) : (
        <>
          <div className="dashboard__container__editCategory__wrapper__basicInfo">
            <form className="dashboard__container__editCategory__wrapper__basicInfo__form" onSubmit={e => submitHandler(e)}>
              <div className="dashboard__container__editCategory__wrapper__basicInfo__form__item">
                <label> title </label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <input type="submit" className='dashboard__container__editCategory__wrapper__basicInfo__form__submit' />
            </form>

          </div>
          <div className="dashboard__container__editCategory__wrapper__left">
            <div className="dashboard__container__editCategory__wrapper__left__img img--container">
              <Image src={imagePreview} layout="fill" objectFit='contain' alt="img" />
            </div>
            <div className="dashboard__container__editCategory__wrapper__left__stock">
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default EditCategory