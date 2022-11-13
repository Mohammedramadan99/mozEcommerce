import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showCartComponent } from '../../store/productsSlice'
import CloseIcon from '@mui/icons-material/Close'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { removeFromCart } from '../../store/productsSlice'
import Link from 'next/link'
function Cart()
{
  const dispatch = useDispatch()
  const { products, total } = useSelector(state => state.products.cart)
  const [shippingPrice, setShippingPrice] = useState(7)
  const showCartHandler = () =>
  {
    dispatch(showCartComponent())
  }
  const removeItem = id =>
  {
    dispatch(removeFromCart(id))
  }
  return (
    <div className='cart'> 
      <div className="cart__overlay" onClick={showCartHandler}>
      </div>
        <div className="cart__wrapper">
        <div className="cart__wrapper__title">your cart</div>
        {products.length === 0 ? (
          <div className="cart__wrapper__emptyCart">
            <div className="cart__wrapper__emptyCart__icon">
              <RemoveShoppingCartIcon />
            </div>
            Your cart is empty.
          </div>
        ): (
          <div className="cart__wrapper__products">
            {products?.map(p => (
              <div key={p._id} className="cart__wrapper__products__product">
                <div className="cart__wrapper__products__product__img">
                  {p.images && <Image src={p?.images[0]?.url} layout="fill" objectFit='contain' alt="productImg" />}
                  <div className="cart__wrapper__products__product__img__quantity"> {p.quantity}X </div>
                </div>
                <div className="cart__wrapper__products__product__details">
                  <div className="cart__wrapper__products__product__details__name"> {p.name} </div>
                  <div className="cart__wrapper__products__product__details__category"> {p.category} </div>
                  <div className="cart__wrapper__products__product__details__price"> ${p.price} </div>
                </div>
                <CloseIcon className='cart__wrapper__products__product__delete' onClick={() => removeItem(p._id)} />
              </div>
            ))}
          </div>
        )}
          <div className="cart__wrapper__priceContent">
          <div className="cart__wrapper__priceContent__price">
            <div className="cart__wrapper__priceContent__price__title">
              {products.length <= 1 ? `${products.length} item` : `${products.length} items`} 
            </div>
            <div className="cart__wrapper__priceContent__price__number"> ${total} </div>
          </div>
          <div className="cart__wrapper__priceContent__shipping">
            <div className="cart__wrapper__priceContent__shipping__title">
              shipping
            </div>
            <div className="cart__wrapper__priceContent__shipping__number">
              ${shippingPrice}
            </div>
          </div>
          <div className="cart__wrapper__priceContent__total">
            <div className="cart__wrapper__priceContent__total__title">
              total
            </div>
            <div className="cart__wrapper__priceContent__total__number">
              ${total + shippingPrice}
            </div>
          </div>
          <Link href="/checkout">
            <a className="cart__wrapper__priceContent__checkoutBtn">
              checkout
            </a>
          </Link>
          </div>
        </div>
    </div>
  )
}

export default Cart