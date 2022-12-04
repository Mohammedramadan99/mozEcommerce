import { Rating } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetailsAction } from '../../../store/productsSlice'
function ProductDetails()
{
  const router = useRouter()
  const {id} = router.query
  const dispatch = useDispatch()
  const { productDetails } = useSelector(state => state.products)
  
  useEffect(() => {
    dispatch(fetchProductDetailsAction(id))
  }, [])
  
  return (
    <div className='dashboard__container__productDetails'>
      <div className="dashboard__container__productDetails__wrapper">
        <div className="dashboard__container__productDetails__wrapper__block">
          <div className="dashboard__container__productDetails__wrapper__left">
            <div className="dashboard__container__productDetails__wrapper__left__img img--container">
              <Image src={productDetails?.images[0].url} layout="fill" alt="img" objectFit='contain' /> 
            </div>
          </div>
          <div className="dashboard__container__productDetails__wrapper__right">
            <div className="dashboard__container__productDetails__wrapper__right__title item">
              {productDetails?.name}
            </div>
            <div className="dashboard__container__productDetails__wrapper__right__category item">
              <span>category </span> :
              <span> {productDetails?.category} </span>
            </div>
            <div className="dashboard__container__productDetails__wrapper__right__price item">
              <span>price </span> :
              <span> {productDetails?.price} </span>
            </div>
            <div className="dashboard__container__productDetails__wrapper__right__stock item">
              <span>stock </span> :
              <span> {productDetails?.Stock} </span>
            </div>
            <div className="dashboard__container__productDetails__wrapper__right__reviews item">
              <span>reviews </span> :
              <span> {productDetails?.numOfReviews} </span>
            </div>
          </div>
        </div>
        <div className="dashboard__container__productDetails__wrapper__desc">
          <div className="dashboard__container__productDetails__wrapper__desc__title">product details</div>
          <div className="dashboard__container__productDetails__wrapper__desc__content">
            {productDetails?.description}
          </div>
        </div>
        <div className="dashboard__container__productDetails__wrapper__rating">
          <div className="dashboard__container__productDetails__wrapper__rating__title">
            ratings
          </div>
          <div className="dashboard__container__productDetails__wrapper__rating__content">
            <div className="dashboard__container__productDetails__wrapper__rating__content__head"> total review </div>
            <div className="dashboard__container__productDetails__wrapper__rating__content__num">
              {productDetails?.ratings.toFixed(1)}
            </div>
            <div className="dashboard__container__productDetails__wrapper__rating__content__stars">
              <Rating value={productDetails?.ratings} readOnly precision={.5} size='larg' />
              <span>Your Average Rating Star</span>
              
            </div>
          </div>
        </div>
        <div className="dashboard__container__productDetails__wrapper__reviews">
          {productDetails?.reviews.length > 0 && (
            <>
              <div className="dashboard__container__productDetails__wrapper__reviews__title">
                customers reviews
              </div>
              <div className="dashboard__container__productDetails__wrapper__reviews__content">
                <div className="dashboard__container__productDetails__wrapper__reviews__content__items">
                  {productDetails?.reviews?.map(rev => (
                    <div key={rev?._id} className="dashboard__container__productDetails__wrapper__reviews__content__items__item">
                      <div className="dashboard__container__productDetails__wrapper__reviews__content__items__item__cstInfo">
                        <div className="dashboard__container__productDetails__wrapper__reviews__content__items__item__cstInfo__img">
                          <Image src={rev?.user?.personalImage?.url} layout="fill" objectFit="contain" alt="cstImg" />
                        </div>
                        <div className="dashboard__container__productDetails__wrapper__reviews__content__items__item__cstInfo__name">
                          {rev?.name}
                        </div>
                      </div>
                      <div className="dashboard__container__productDetails__wrapper__reviews__content__items__item__stars">
                        <Rating value={rev?.rating} readOnly precision={.5} size='small' />
                      </div>
                      <div className="dashboard__container__productDetails__wrapper__reviews__content__items__item__revTxt">
                        {rev.comment}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default ProductDetails