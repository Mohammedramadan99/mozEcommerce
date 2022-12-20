import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import burger from '../../public/food/Burger/Food Big Burger.png'
function Banner()
{
  const { allProducts } = useSelector(state => state.products.productsList)
  const bannerImg = allProducts?.find(p => p._id === '635a4b340dd49b3e0493dc85')?.images[0]?.url
  console.log(bannerImg)
  return (
    <div className='banner'>
      <div className="container">
        <div className="banner__content">
          <div className="banner__content__smallTxt">
            burger?
          </div>
          <div className="banner__content__img">
            <Image src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1668378028/ecommerce/xbbudk0hjtuj1p7l2c8i.png" layout="fill" objectFit='contain' alt="bannerImg" />
          </div>
          <div className="banner__content__regTxt">
            yes, please! <span>mmmmmm....</span>
          </div>
          {/* <div className="banner__content__longTxt">
            While other massive burgers proudly tout their weight as their defining feature, the Triple Meat flies under the radar and blends in with its third- and half-pound competitors. 
          </div> */}
        </div>

      </div>
    </div>
  )
}

export default Banner