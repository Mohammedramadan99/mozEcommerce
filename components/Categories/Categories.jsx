import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
function Categories()
{
  const {categories} = useSelector(state => state.category)
  return (
    <div className='categories'>
      <div className="categories__items">
      {
        categories?.map(cat => (
          <Link href={`/products?category=${cat.title}`} key={cat._id} >
            <a className="categories__items__item" data-aos="fade-left">
              <div className="categories__items__item__name"> {cat?.title} </div>
              <div className="categories__items__item__img">
                {cat?.images[0]?.url && <Image src={cat?.images[0]?.url} layout="fill" objectFit='contain' alt="cImg" />}
                
              </div>
            </a>
          </Link>
        ))
      }
      </div>
    </div>
  )
}

export default Categories