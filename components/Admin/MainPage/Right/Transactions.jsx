import moment from 'moment/moment'
import React from 'react'
import { useSelector } from 'react-redux'

function Transactions()
{
  const {orders} = useSelector(state => state.stats)
  return (
    <div className='dashboard__container__content__mainPage__right__transactions'>
      <div className="dashboard__container__content__mainPage__right__transactions__title">
        latest Transactions
      </div>
      <div className="dashboard__container__content__mainPage__right__transactions__orders">
        {orders?.map(item => (
          <div key={item._id} className="dashboard__container__content__mainPage__right__transactions__orders__item">
            <div className="dashboard__container__content__mainPage__right__transactions__orders__item__name">
              mohammed ramadan
            </div>
            <div className="dashboard__container__content__mainPage__right__transactions__orders__item__total">
              ${(item.subtotal / 100).toLocaleString()}
            </div>
            <div className="dashboard__container__content__mainPage__right__transactions__orders__item__time">
              {moment(item.createdAt).fromNow()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transactions