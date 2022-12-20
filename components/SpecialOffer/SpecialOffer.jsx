import Image from 'next/image'
import { useSelector } from 'react-redux'

function SpecialOffer()
{
  const { allProducts } = useSelector(state => state?.products?.productsList)
  const specialProduct = allProducts?.find(p => p._id === '635a54c60dd49b3e0493dcbb')
  console.log(specialProduct)
  return (
    <div className='specialOffer'>
      <div className="container">
        <div className="specialOffer__left">
          <div className="specialOffer__left__sectionHeader">
            special offer
          </div>
          <div className="specialOffer__left__name">
            {specialProduct?.name}
          </div>
          <div className="specialOffer__left__category">
            {specialProduct?.category}
          </div>
          <div className="specialOffer__left__price">
            ${specialProduct?.price}
          </div>
          <div className="specialOffer__left__btn">
            add to cart
          </div>
        </div>
        <div className="specialOffer__right">
          <div className="specialOffer__right__img">
            {specialProduct?.images[0]?.url && <Image src='https://res.cloudinary.com/dtmjc8y9z/image/upload/v1668381401/ecommerce/g3bgyk9qmbjgdshf6mxw.png' layout="fill" objectFit='contain' alt="img" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer