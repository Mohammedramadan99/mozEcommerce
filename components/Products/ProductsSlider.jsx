import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Virtual } from 'swiper'
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from '@mui/material'
function ProductsSlider({products})
{  
  return (
    <div className='productsSlider'>
      <div className="productsSlider__items">
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
              slidesPerView: 2,
              spaceBetween: 5
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 5
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 5
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 5
            },
          }}
        >
          {products?.map(p => (
          <SwiperSlide key={p?._id}>
            <Link href={`/product/${p?._id}`} >
              <a className="productsSlider__items__item" data-aos="fade-up">
                <div className="productsSlider__items__item__imgWrapper">
                  <div className="productsSlider__items__item__imgWrapper__img">
                      {p.images.length > 0 && <Image src={p?.images[0]?.url} layout="fill" objectFit='contain' alt="productImage" />}
                      
                  </div>
                </div>
                <div className="productsSlider__items__item__info">
                  <div className="productsSlider__items__item__info__name">
                    {p.name}
                  </div>
                  <div className="productsSlider__items__item__info__price">
                    {p.price}$
                  </div>
                  <div className="productsSlider__items__item__info__details">
                    <span className="productsSlider__items__item__info__details__category">
                      {p.category}
                    </span>
                      <span className='productsSlider__items__item__info__details__rating'>
                        <Rating value={p?.ratings} readOnly precision={.5} size='small' />
                      </span>
                      <span className="productsSlider__items__item__info__details__stock">
                        {p.Stock > 0 ? "  in stock" : "  out of stock" }
                      </span>
                  </div>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ProductsSlider