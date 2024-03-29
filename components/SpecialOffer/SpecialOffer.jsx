import Image from 'next/image'
import Link from 'next/link'

function SpecialOffer()
{
  return (
    <div className='specialOffer'>
      <div className="container">
        <div className="specialOffer__left" data-aos="fade-left">
          <div className="specialOffer__left__sectionHeader">
            special offer
          </div>
          <div className="specialOffer__left__name">
            Quesadilla
          </div>
          <div className="specialOffer__left__category">
            mexican food
          </div>
          <div className="specialOffer__left__price">
            $25
          </div>
          <Link href="product/63717ad9fd6daaea663d2589">
            <a className="specialOffer__left__btn">
              more details
            </a>
          </Link>
        </div>
        <div className="specialOffer__right" data-aos="fade-right">
          <div className="specialOffer__right__img">
            <Image src='https://res.cloudinary.com/dtmjc8y9z/image/upload/v1668381401/ecommerce/g3bgyk9qmbjgdshf6mxw.png' layout="fill" objectFit='contain' alt="img" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer