import MuiBreadcrumbs from '../Breadcrumbs/Breadcrumbs'
import Form from 'react-bootstrap/Form';
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useState } from 'react';
import getStripe from '../../utils/getStripe';

function Checkout()
{
  const router = useRouter()
  const { products, total } = useSelector(state => state.products.cart)
  const [shipping, setShipping] = useState(7)
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const checkoutHandler = async e =>
  {
    e.preventDefault()
    const cartProducts = {products}
    // router.push('/payment')
    const stripe = await getStripe()
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartProducts)
    })
    if (response.statusCode === 500) return;
    const data = await response.json()
    stripe.redirectToCheckout({sessionId:data.id})
  }
  return (
    <div className='checkout'>
      <div className="container">
        <div className="checkout__left">
          <div className="checkout__left__title">checkout</div>
          <div className="checkout__left__breadcrumbs">
            <MuiBreadcrumbs items={[{ title: 'cart', link: '#' }, { title: 'shipping', link: '#' }, { title: 'payment', link: '#' }]} />
          </div>
          <form className="checkout__left__form" onSubmit={e => checkoutHandler(e)}>
            <div className="checkout__left__form__blockOne">
              <div className="checkout__left__form__blockOne__contactInfo">
                <div className="checkout__left__form__blockOne__contactInfo__header">
                  contact information
                </div>
                <div className="checkout__left__form__blockOne__contactInfo__input">
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="email" 
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                  </Form.Floating>
                </div>
              </div>
            </div>
            <div className="checkout__left__form__blockTwo">
              <div className="checkout__left__form__blockTwo__shipping">
                <div className="checkout__left__form__blockTwo__shipping__header">
                  shipping address
                </div>
                <div className="checkout__left__form__blockTwo__shipping__inputs">
                  <div className="cstm_row">
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="first name"
                        onChange={ (e) => setFirstName(e.target.value) }
                      />
                      <label htmlFor="floatingInputCustom">first name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="last name"
                        onChange={(e) => setLastName(e.target.value) }
                      />
                      <label htmlFor="floatingInputCustom">last name</label>
                    </Form.Floating>
                  </div>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="text"
                      placeholder="address"
                      onChange={e => setAddress(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">address</label>
                  </Form.Floating>
                  <div className="cstm_row">
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="country"
                        onChange={ e => setCountry(e.target.value) }
                      />
                      <label htmlFor="floatingInputCustom">country / region</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="city"
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <label htmlFor="floatingInputCustom">city</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="address"
                        onChange={e => setPostalCode(e.target.value)}
                      />
                      <label htmlFor="floatingInputCustom">postal code</label>
                    </Form.Floating>
                  </div>
                  <input type="submit" className='checkout__left__form__blockTwo__shipping__inputs__submit' value="continue to shipping" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="checkout__right">
          <div className="checkout__right__cartProducts">
            {products?.map(p => (
              <div key={p._id} className="checkout__right__cartProducts__item">
                <div className="checkout__right__cartProducts__item__img">
                  <Image src={p?.images[0]?.url} layout="fill" objectFit='contain' alt="productImg" />
                </div>
                <div className="checkout__right__cartProducts__item__details">
                  <div className="checkout__right__cartProducts__item__details__name"> {p.name} </div>
                  <div className="checkout__right__cartProducts__item__details__category"> {p.category} </div>
                  <span className="checkout__right__cartProducts__item__details__qty"> X{p.quantity} </span>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout__right__cartSummery">
            <hr />
            <div className="checkout__right__cartSummery__item">
              <div className="checkout__right__cartSummery__item__title">subtotal</div>
              <div className="checkout__right__cartSummery__item__number"> ${total} </div>
            </div>
            <div className="checkout__right__cartSummery__item">
              <div className="checkout__right__cartSummery__item__title"> shipping </div>
              <div className="checkout__right__cartSummery__item__number"> ${shipping} </div>
            </div>
            <hr />
            <div className="checkout__right__cartSummery__item">
              <div className="checkout__right__cartSummery__item__title"> total </div>
              <div className="checkout__right__cartSummery__item__number"> ${total + shipping} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout