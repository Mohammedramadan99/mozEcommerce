import React, { useEffect, useState } from 'react'
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import Image from 'next/image'
import Link from 'next/link'
import {fetchCategoriesAction} from '../../store/categorySlice'
import { useDispatch, useSelector } from 'react-redux'

function AllCategories()
{
  const dispatch = useDispatch()
  const {categories} = useSelector(state => state.category)
  // const [categories, setCategories] = useState([
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'Bagels',
  //     img: bagel_1
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'burger',
  //     img: burger_2
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'Cupcake',
  //     img: cake_3
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'Chicken',
  //     img: checken_3
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'Bagels',
  //     img: bagel_1
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'burger',
  //     img: burger_2
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'Cupcake',
  //     img: cake_3
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'Chicken',
  //     img: checken_3
  //   },
  // ])
  useEffect(() => {
    dispatch(fetchCategoriesAction())
  }, [])
  
  return (
    <div className='allCategories'>
      <div className="allCategories__items">
        <Swiper
          navigation={true}
          modules={[Virtual, Navigation, Pagination]}
          grabCursor={true}
          // centeredSlides={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          virtual
        >
          {categories?.map(item => (
            <SwiperSlide key={item?.id}>
              <Link href={`/products?category=${item?.title}`}>
                <a className="allCategories__items__item">
                  <div className="allCategories__items__item__img">
                    <Image src={item?.images[0]?.url} layout="fill" objectFit="contain" alt="categoryImg" />
                  </div>
                  <div className="allCategories__items__item__info">
                    <div className="allCategories__items__item__info__name">
                      {item.title}
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

export default AllCategories