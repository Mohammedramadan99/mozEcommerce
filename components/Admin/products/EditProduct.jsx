import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCategoriesAction} from '../../../store/categorySlice'
import { updateproductAction, fetchProductDetailsAction, reset } from '../../../store/productsSlice'
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/router'

function EditProduct()
{
  const router = useRouter()
  const {id} = router.query
  const {categories} = useSelector(state => state.category)
  const { allProducts } = useSelector(state => state.products?.productsList)
  const { isUpdated,loading } = useSelector(state => state.products)
  const [productDetails, setProductDetails] = useState()
  const dispatch = useDispatch()
  const [name, setName] = useState(productDetails?.name)
  const [description, setDescription] = useState(productDetails?.description)
  const [category, setCategory] = useState(productDetails?.category)
  const [stock, setStock] = useState(productDetails?.Stock)
  const [image, setImage] = useState(productDetails?.images[0]?.url)
  const [imagePreview, setImagePreview] = useState(productDetails?.images[0]?.url)

  const submitHandler = e =>
  {
    e.preventDefault()
    const data = {
      id,
      props: {
        name,
        description,
        category,
        Stock:stock,
        image
      }
    }
    console.log(data)
    dispatch(updateproductAction(data))
  }
  useEffect(() => {
    dispatch(fetchCategoriesAction())
    // ? that is the best method to show the product details firstly before editing the details
    let product = allProducts?.filter(p => p._id === id) // ? find the product
    product = product[0] // ? because filter returns the result in an array 
    setProductDetails(product) // ? then put the product in the productDetails state
    
    // ? now it's time to put the details on the states and that will show the details on the screen(form)
    setName(product?.name)
    setDescription(product?.description)
    setStock(product?.Stock)
    setCategory(product?.category)
    setImage(product?.images[0]?.url)
    setImagePreview(product?.images[0]?.url)
  }, [dispatch])
  useEffect(() => {
    if (isUpdated)
    {
      router.push(`/dashboard/products`)
      dispatch(reset())
    }
  }, [dispatch,isUpdated])
  return (
    <div className='dashboard__container__editProduct__wrapper'>
      {loading ? (
        <>
          <Spinner animation="border" variant="danger" size='sm' />
        </>
      ) : (
          <>
            <div className="dashboard__container__editProduct__wrapper__basicInfo">
              <form className="dashboard__container__editProduct__wrapper__basicInfo__form" onSubmit={e => submitHandler(e)}>
                <div className="dashboard__container__editProduct__wrapper__basicInfo__form__item">
                  <label> title </label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="dashboard__container__editProduct__wrapper__basicInfo__form__item">
                  <label> description </label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="dashboard__container__editProduct__wrapper__basicInfo__form__row">
                  <div className="dashboard__container__editProduct__wrapper__basicInfo__form__item">
                    <label> category </label>
                    <select onChange={e => setCategory(e.target.value)} value={category}>
                      {categories?.map(cat => <option key={cat._id} value={cat.title.toLowerCase()}> {cat.title.toLowerCase()} </option>)}
                    </select>
                  </div>
                  <div className="dashboard__container__editProduct__wrapper__basicInfo__form__item">
                    <label> stock </label>
                    <input type="number" value={stock} onChange={e => setStock(e.target.value)} />
                  </div>
                </div>
                <input type="submit" className='dashboard__container__editProduct__wrapper__basicInfo__form__submit' />
              </form>

            </div>
            <div className="dashboard__container__editProduct__wrapper__left">
              <div className="dashboard__container__editProduct__wrapper__left__img img--container">
                <Image src={imagePreview} layout="fill" objectFit='contain' alt="img" />
              </div>
              <div className="dashboard__container__editProduct__wrapper__left__stock">
              </div>
            </div>
          </>
      ) }
      
    </div>
  )
}

export default EditProduct