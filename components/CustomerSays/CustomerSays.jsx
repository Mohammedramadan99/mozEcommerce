import React from 'react'
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import FormatQuoteTwoTone from '@mui/icons-material/FormatQuote'
import {Stack,Rating} from '@mui/material'
import { useEffect } from 'react';
import {fetchGlobalReviewsAction} from '../../store/reviewUsSlice'
import { useDispatch, useSelector } from 'react-redux';
function CustomerSays()
{
  const dispatch = useDispatch()
  const { reviewsList } = useSelector(state => state.globalReviews)

  // const {} = useSelector(state => state.globalReviews)
  const cstSys = [
    {
      id: Math.floor(Math.random() * 1000),
      cstName: "mohammed ramadan",
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores quam nulla adipisci sed dicta fuga ab, reiciendis illum autem fugiat pariatur! Impedit temporibus necessitatibus provident nemo illum sequi quas',
      rating: 4
    },
    {
      id: Math.floor(Math.random() * 1000),
      cstName: "john doe",
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores quam nulla adipisci sed dicta fuga ab, reiciendis illum autem fugiat pariatur! Impedit temporibus necessitatibus provident nemo illum sequi quas',
      rating: 4
    },
    {
      id: Math.floor(Math.random() * 1000),
      cstName: "bosy cat",
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores quam nulla adipisci sed dicta fuga ab, reiciendis illum autem fugiat pariatur! Impedit temporibus necessitatibus provident nemo illum sequi quas',
      rating: 3
    },
    {
      id: Math.floor(Math.random() * 1000),
      cstName: "felbrt",
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit asperiores quam nulla adipisci sed dicta fuga ab, reiciendis illum autem fugiat pariatur! Impedit temporibus necessitatibus provident nemo illum sequi quas',
      rating: 2
    },
  ]
  useEffect(() => {
    dispatch(fetchGlobalReviewsAction())
  }, [])
  
  return (
    <div className='cstSys'>
      <div className="container">
        <div className="cstSys__items">
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            grabCursor={true}
            pagination={{ clickable: true }}
            virtual
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 5
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 5
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 5
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 5
              },
              1280: {
                slidesPerView: 1,
                spaceBetween: 5
              },
            }}
          >
            {reviewsList?.map(item => (
              <SwiperSlide key={item?._id}>
                <FormatQuoteTwoTone className="quoteIcon" data-aos="fade-left" />
                <div className="cstSys__items__item" data-aos="fade-right">
                  <q className='cstSys__items__item__opinion'> {item.review} </q>
                  <div className='cstSys__items__item__rating'>
                      <Rating value={item.rating} style={{ cursor: 'auto' }} readOnly/>
                  </div>
                  <p className='cstSys__items__item__name'> {item.user.name} </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default CustomerSays