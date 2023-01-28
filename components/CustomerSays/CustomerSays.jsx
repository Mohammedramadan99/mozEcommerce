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
import Image from 'next/image';
function CustomerSays()
{
  const dispatch = useDispatch()
  const { reviewsList } = useSelector(state => state.globalReviews)


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
                  <div className="cstSys__items__item__img">
                    <Image src={item?.user?.personalImage?.url} layout="fill" alt="img"/>
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