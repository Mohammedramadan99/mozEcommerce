import { Call, Facebook,MessageTwoTone, Instagram, LocationCity, Message, Twitter, YouTube } from '@mui/icons-material'
import React from 'react'
import Logo from './logo/Logo'

function Footer() {
  return (
    <div className='footer'>
      <div className="container">
        <div className="footer__partOne" data-aos="fade-up">
          <div className="footer__partOne__logo">
            <Logo/>
          </div>
          <div className="footer__partOne__txt"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas illo, dolor eius suscipit totam quae doloremque labore laborum, et explicabo harum qui molestias animi unde vero odit voluptatum ad ullam. </div>
          <div className="footer__partOne__links">
            <div className="footer__partOne__links__link">
              <Facebook/>
            </div>
            <div className="footer__partOne__links__link">
              <Twitter/>
            </div>
            <div className="footer__partOne__links__link">
              <YouTube/>
            </div>
            <div className="footer__partOne__links__link">
              <Instagram/>
            </div>
          </div>
        </div>
        <div className="footer__partTwo" data-aos="fade-down">
          <div className="footer__partTwo__header">
            customer support
          </div>
          <div className="footer__partTwo__links">
            <div className="footer__partTwo__links__link">
              help
            </div>
            <div className="footer__partTwo__links__link">
              my account
            </div>
            <div className="footer__partTwo__links__link">
              privacy policy
            </div>
            <div className="footer__partTwo__links__link">
              contact
            </div>
            <div className="footer__partTwo__links__link">
              FAQ
            </div>
          </div>
        </div>
        <div className="footer__partThree" data-aos="fade-up-left">
          <div className="footer__partThree__header">
            contact info
          </div>
          <div className="footer__partThree__items">
            <div className="footer__partThree__items__item">
              <div className="footer__partThree__items__item__title">
                <div className="footer__partThree__items__item__title__icon">
                  <LocationCity/>
                </div>
                <div className="footer__partThree__items__item__title__txt">location</div>
              </div>
              <div className="footer__partThree__items__item__content"> 266 elzahraa, ain shams, cairo, egy </div>
            </div>
            <div className="footer__partThree__items__item">
              <div className="footer__partThree__items__item__title">
                <div className="footer__partThree__items__item__title__icon">
                  <MessageTwoTone />
                </div>
                <div className="footer__partThree__items__item__title__txt">email</div>
              </div>
              <div className="footer__partThree__items__item__content">
                moz@gmail.com
              </div>
            </div>
            <div className="footer__partThree__items__item">
              <div className="footer__partThree__items__item__title">
                <div className="footer__partThree__items__item__title__icon">
                  <Call/>
                </div>
                <div className="footer__partThree__items__item__title__txt">call</div>
              </div>
              <div className="footer__partThree__items__item__content">
                022- 0112661999klm
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        copyright &#169;	moz market created by ❤️
      </div>
    </div>
  )
}

export default Footer