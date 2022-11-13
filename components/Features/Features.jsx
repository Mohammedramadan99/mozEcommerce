import React from 'react'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import SupportIcon from '@mui/icons-material/Support'
function Features()
{
  const features = [
    {
      id: Math.floor(Math.random() * 1000),
      title: 'Free delivery',
      txt:"Get one free delivery per month, anywhere in Egypt",
      icon: <DeliveryDiningIcon/>
    },
    {
      id: Math.floor(Math.random() * 1000),
      title: 'Free returns',
      txt:"Hassle-free returns policy and 100% money back guarantee",
      icon: <MoneyOffIcon/>
    },
    {
      id: Math.floor(Math.random() * 1000),
      title: 'support 24/7',
      txt:"contact us 24 hours a day",
      icon: <SupportIcon/>
    },
  ]
  return (
    <div className='features'>
      <div className="container">
        <div className="features__items">
          {features.map(feat => (
            <div key={feat?.id} className="features__items__item">
              <div className="features__items__item__icon">
                {feat.icon}
              </div>
              <div className="features__items__item__info">
                <div className="features__items__item__info__title">
                  {feat.title}
                </div>
                <div className="features__items__item__info__txt">
                  {feat.txt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features