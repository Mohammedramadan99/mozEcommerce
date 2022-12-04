import React from 'react'
import AllTime from './AllTime'
import Transactions from './Transactions'

function Right() {
  return (
    <div className='dashboard__container__content__mainPage__right'>
      <Transactions/>
      <AllTime/>
    </div>
  )
}

export default Right