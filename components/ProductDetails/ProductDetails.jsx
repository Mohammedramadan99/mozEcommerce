import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetailsAction, fetchFilteredProductsAction, reset } from '../../store/productsSlice'
import { addReview } from '../../store/productsSlice'
import { addToCart } from '../../store/productsSlice'
import
{
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProductsSlider from '../Products/ProductsSlider'
import { Spinner } from 'react-bootstrap'
function ProductDetails()
{
  const dispatch = useDispatch()
  const { productDetails: product,loading,addedReview ,productsList:{products}} = useSelector(state => state.products)
  const { userAuth } = useSelector(state => state.users)
  const [quantity, setQuantity] = useState(0)
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const categoryProducts = products?.filter(p => p._id !== product?._id)
  
  const router = useRouter();
  const { id } = router.query;
  const ChangeQuantity = (type) =>
  {
    if (type === "plus")
    {
      quantity >= product?.Stock ? setQuantity(product?.Stock) : setQuantity(quantity + 1)
    } else
    {
      quantity <= 0 ? setQuantity(0) : setQuantity(quantity - 1)
    }
  }
  const submitReviewToggle = () =>
  {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () =>
  {
    if (!userAuth || !userAuth.token)
    {
      toast.error('you need to login first')
    } else
    {
      const myForm = { rating: rating, comment: comment, productId:id }
      dispatch(addReview(myForm));
      setOpen(false);
    }
  };
  useEffect(() =>
  {
    if (addedReview)
    {
      dispatch(reset())
    }
    dispatch(fetchProductDetailsAction(id))
    dispatch(fetchFilteredProductsAction({category:product?.category}))
  }, [dispatch, id, addedReview, product?.category])
  const addToCartHandler = () => {
    dispatch(addToCart({...product,quantity}))
  }
  const [barActive, setBarActive] = useState('reviews')
  console.log(barActive)
  return (
    <div className='productDetails'>
      {loading ? (
        <div
          className="spinner"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <div className="container">        
            <div className="productDetails__left">
              <div className="productDetails__left__img">
                {product?.images.length > 0 && <Image src={product?.images[0]?.url} layout="fill" objectFit='contain' alt="productImg" />}
              </div>
            </div>
            <div className="productDetails__right">
              <div className="productDetails__right__name"> {product?.name} </div>
              <div className="productDetails__right__rating">
                <div className="productDetails__right__rating__stars">
                  <Rating value={product?.ratings} readOnly precision={.5} /> 
                </div>
                <div className="productDetails__right__rating__reviewsNum"> {product?.numOfReviews < 1 || product?.numOfReviews === 1 ? `( ${product?.numOfReviews} review )` : product?.numOfReviews > 1 && `( ${product?.numOfReviews} reviews )` }  </div>
              </div>
              <div className="productDetails__right__price"> {product?.price}$ </div>
              <div className="productDetails__right__desc">
                {product?.description}
              </div>
              <div className="productDetails__right__quantity">
                <div className="productDetails__right__quantity__icon" onClick={() => ChangeQuantity('minus')}>
                  <ArrowLeftOutlinedIcon  />
                </div>
                <p> {quantity} </p>
                <div className="productDetails__right__quantity__icon" onClick={() => ChangeQuantity('plus')}>
                  <ArrowRightOutlinedIcon  />
                </div>
              </div>
              <div className="productDetails__right__btns">
                <div className="productDetails__right__btns__btn main__btn" onClick={addToCartHandler}>
                  add to cart
                </div>
                <div className="productDetails__right__btns__btn " onClick={submitReviewToggle}>
                  add a review
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div className="productDetails__bottom">
        <div className="container">
          
          <div className="productDetails__bottom__relatedPoriductsSection">
            <div className="productDetails__bottom__relatedPoriductsSection__header">
              Products you may also like
              <span> Based on the category of {product?.name} </span>
            </div>
            <div className="productDetails__bottom__relatedPoriductsSection__products">
              <ProductsSlider products={categoryProducts} />
            </div>
          </div>
          <div className="productDetails__bottom__reviewsSection">
            <div className="productDetails__bottom__reviewsSection__bar">
              <div className={`productDetails__bottom__reviewsSection__bar__link ${barActive === 'description' ? 'active' : ''}`} onClick={(e) => setBarActive('description')}>description</div>
              <div className={`productDetails__bottom__reviewsSection__bar__link ${barActive === 'reviews' ? 'active' : ''}`} onClick={(e) => setBarActive('reviews')}> reviews </div>
            </div>
            {barActive === 'description' ? (
              <div className='productDetails__bottom__reviewsSection__description zoomIn_animation'>
                {product?.description}
              </div>
            ) : barActive === 'reviews' && (
              <div className='productDetails__bottom__reviewsSection__reviews zoomOut_animation'>
                <div className="productDetails__bottom__reviewsSection__reviews__header">
                  Customer reviews & ratings
                </div>
                <div className="productDetails__bottom__reviewsSection__reviews__ratingNum">
                    <div className="productDetails__bottom__reviewsSection__reviews__ratingNum__num"> <span> {product?.ratings.toFixed(1)} </span> out of <span> 5 </span> </div>
                  <div className="productDetails__bottom__reviewsSection__reviews__ratingNum__stars">
                    <Rating value={product?.ratings} readOnly precision={.5} size='small' />
                    ({product?.reviews.length} reviews)
                  </div>
                </div>
                <div className="productDetails__bottom__reviewsSection__reviews__items">
                  {product?.reviews.map(rev => (
                    <div key={rev._id} className="productDetails__bottom__reviewsSection__reviews__items__item">
                      <div className="productDetails__bottom__reviewsSection__reviews__items__item__img">
                        {rev?.user?.personalImage?.url && <Image src={rev?.user?.personalImage?.url} layout="fill" objectFit='contain' alt="img" />}
                      </div>
                      <div className="productDetails__bottom__reviewsSection__reviews__items__item__content">
                        <div className="productDetails__bottom__reviewsSection__reviews__items__item__rating">
                          <Rating value={rev?.rating} readOnly precision={.5} size='small' />
                        </div>
                        <div className="productDetails__bottom__reviewsSection__reviews__items__item__content__txt">
                          {rev.comment}
                        </div>
                        <div className="productDetails__bottom__reviewsSection__reviews__items__item__content__name">
                          {rev.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails