import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderAction } from '../../../store/orderSlice'
import Header from '../Header'
import { Spinner } from "react-bootstrap";

function OrderDetails()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const { orderDetails, loading } = useSelector(state => state.order)
  
  useEffect(() => { 
    dispatch(fetchOrderAction(id))
  }, [])
  return (
    <div className="dashboard__container__orderDetails">
      <Header title='order details' />
      <div className='dashboard__container__orderDetails__wrapper'>
        {loading ? (
          <div
            className="spinner"
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <>
            <div className="dashboard__container__orderDetails__wrapper__header">
                order {orderDetails?._id}
            </div>
            <div className="dashboard__container__orderDetails__wrapper__info">
              <div className="dashboard__container__orderDetails__wrapper__info__details">
                <div className="dashboard__container__orderDetails__wrapper__info__details__item">
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__title">
                    delivery status
                  </div>
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__value">
                    {orderDetails?.delivery_status}
                  </div>
                </div>
                <div className="dashboard__container__orderDetails__wrapper__info__details__item">
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__title">
                    total price 
                  </div>
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__value">
                    ${orderDetails?.total.toLocaleString()}
                  </div>
                </div>
                <div className="dashboard__container__orderDetails__wrapper__info__details__item">
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__title">
                    customer
                  </div>
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__value">
                    {orderDetails?.user?.name}
                  </div>
                </div>
                <div className="dashboard__container__orderDetails__wrapper__info__details__item">
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__title">
                    email
                  </div>
                  <div className="dashboard__container__orderDetails__wrapper__info__details__item__value">
                    {orderDetails?.user?.email}
                  </div>
                </div>
              </div>
              <div className="dashboard__container__orderDetails__wrapper__info__orderProducts">
                <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__title">products</div>
                <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__items">
                  {orderDetails?.products?.map((p,i) => (
                    <div key={i} className="dashboard__container__orderDetails__wrapper__info__orderProducts__items__item">
                      <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__items__item__left">
                        <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__items__item__left__img img--container">
                          <Image src={p?.images[0]?.url} layout="fill" objectFit='contain' alt="img" />
                        </div>
                      </div>
                      <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__items__item__right">
                        <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__items__item__right__name">
                          {p?.name}
                        </div>
                        <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__items__item__right__price">
                          {p?.price}
                        </div>
                        <div className="dashboard__container__orderDetails__wrapper__info__orderProducts__items__item__right__qty">
                          {p?.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        
      </div>
    </div>
  )
}

export default OrderDetails