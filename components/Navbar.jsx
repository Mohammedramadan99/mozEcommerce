import React from 'react'
import Logo from './logo/Logo'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { showCartComponent } from '../store/productsSlice'
import { logoutAction } from '../store/usersSlice'
import Image from 'next/image';
import { useRouter } from 'next/router';
// import Image from 'next/image';
// import { useRouter } from 'next/router';

function NavBar()
{
  const router = useRouter()
  const dispatch = useDispatch()
  // const router = useRouter()
  const { userAuth } = useSelector(state => state.users)
  const { cartQuantity, products, showCart } = useSelector(state => state.products.cart)

  console.log(products)
  const showCartHandler = () =>
  {
    dispatch(showCartComponent())
  }
  const profileClickHandler = () =>
  {
    router.push('/profile')
  }
  const logoutHandler = () =>
  {
    console.log('log out')
    dispatch(logoutAction())
  }
  return (
    <nav className='nav'>
      <div className="container">
        <Logo/> 
        <ul className="nav__links">
          <Link href="/" >
            <a className='nav__links__link'>
              home
            </a>
          </Link>
          <Link href="/products">
            <a className='nav__links__link'>
              products
            </a>
          </Link>
          <Link href="/reviewus">
            <a className='nav__links__link'>
              review us
            </a>
          </Link>
          {!userAuth?.token ? (
            <>
              <Link href="/login">
                <a className='nav__links__link'>
                  login
                </a>
              </Link>
              <Link href="/register">
                <a className='nav__links__link'>
                  register
                </a>
              </Link>
            </>
          ) : (
              <>
                <Link href="/register" >
                  <a className='nav__links__link' onClick={logoutHandler}>
                    logout
                  </a>
                </Link>
              </>
          )}
        </ul>
        <Link href='#' >
          <a className="nav__cart" onClick={showCartHandler}>
            <ShoppingCartIcon />
            {products?.length > 0 && 
              <div className="nav__cart__num">
              {products?.length}
              </div>
            }
          </a>
        </Link>
        {userAuth?.personalImage?.url || userAuth?.name && (
          <Link href="/profile">
            <a className='nav__profile'>
              <div className="nav__profile__img" >
                {userAuth?.personalImage?.url ?
                  <Image src={userAuth?.personalImage?.url} layout="fill" objectFit='contain' alt="img" /> :
                  userAuth?.name && (
                    <div className='nav__profile__img__litter'> {userAuth.name[0]} </div>
                  )}
              </div>
            </a>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar