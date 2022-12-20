import Image from 'next/image'
import { useSelector } from 'react-redux'

function SpecialOffer()
{
  const { allProducts } = useSelector(state => state?.products?.productsList)
  // const specialProduct = allProducts?.find(p => p._id === '63717ad9fd6daaea663d2589')
  // console.log(specialProduct)
  return (
    <div className='specialOffer'>
      <div className="container">
        <div className="specialOffer__left">
          <div className="specialOffer__left__sectionHeader">
            special offer
          </div>
          <div className="specialOffer__left__name">
            {/* {specialProduct?.name} */}
            Quesadilla
          </div>
          <div className="specialOffer__left__category">
            {/* {specialProduct?.category} */}
            mexican food

          </div>
          <div className="specialOffer__left__price">
            {/* ${specialProduct?.price} */}
            $ 25
          </div>
          <div className="specialOffer__left__btn">
            add to cart
          </div>
        </div>
        <div className="specialOffer__right">
          <div className="specialOffer__right__img">
            <Image src='https://res.cloudinary.com/dtmjc8y9z/image/upload/v1668381401/ecommerce/g3bgyk9qmbjgdshf6mxw.png' layout="fill" objectFit='contain' alt="img" />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer