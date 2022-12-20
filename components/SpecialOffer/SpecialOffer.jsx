import Image from 'next/image'
import { useSelector } from 'react-redux'

function SpecialOffer()
{
  const { allProducts } = useSelector(state => state?.products?.productsList)
  const specialProduct = allProducts?.find(p => p._id === '63717ad9fd6daaea663d2589')
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
            {specialProduct?.images[0]?.url && <Image src={specialProduct?.images[0]?.url} layout="fill" objectFit='contain' alt="img" />}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer