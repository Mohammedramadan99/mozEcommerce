import { Pagination, Rating, Slider } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MuiBreadcrumbs from '../Breadcrumbs/Breadcrumbs'
import {addToCart, allCategories, fetchFilteredProductsAction} from '../../store/productsSlice'
import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import SearchIcon from '@mui/icons-material/Search'
import Spinner from 'react-bootstrap/Spinner';
import CloseIcon from '@mui/icons-material/Close'
import {fetchCategoriesAction} from '../../store/categorySlice'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Products()
{
  const router = useRouter()
  const { category: categoryRoute } = router.query
  console.log(categoryRoute)
  // vars
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState(categoryRoute ? categoryRoute : '')
  const [ratings, setRatings] = useState(0)
  const [priceLess, setPriceLess] = useState(300)
  const [priceGreater, setPriceGreater] = useState(0)
  const activeFilter = [
    keyword !== '' ? { type: 'keyword', payload: keyword } : 'hide',
    category !== '' ? { type: 'category', payload: category } : 'hide',
    ratings !== 0 ? { type: 'ratings', payload: ratings } : 'hide',
    priceLess !== 300 ? { type: 'priceLess', payload: priceLess !== 300 && `less than ${priceLess}` } : 'hide',
    priceGreater !== 0 ? { type: 'priceGreater', payload: `more than ${priceGreater}` } : 'hide'
  ]
  const { products, resPerPage, filteredProductsCount, productsCount, paginationResult } = useSelector(state => state.products.productsList)
  const { categories } = useSelector(state => state.category)
  const {loading} = useSelector(state => state.products)
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // functionnality
  const cats = products?.map(p => p.category)
  const uniqueCategories = cats?.filter(function (item, pos)
  {
    return cats.indexOf(item) == pos;
  })
  console.log(uniqueCategories)
  
  const perPage = {n: 9}
  const categoryHandler = c =>
  {
    setCategory(c)
  }
  const priceHandler = (event, newPrice) =>
  {
    console.log(event)
    setPrice(newPrice);
  };
  const removeActiveFilter = item =>
  {
    console.log(item)
    switch (item.type) {
      case 'category': setCategory('')
        break;
      case 'keyword': setKeyword('')
        break;
      case 'priceLess': setPriceLess(300) 
        break;
      case 'priceGreater': setPriceGreater(0)
        break;
      case 'ratings': setRatings(0)
        break;
      default: return;
        break;
    }
  }
  const handleChange = (e,p) =>
  {
    setCurrentPage(p)
  }
  const addToCartHandler = product =>
  {
    dispatch(addToCart({...product,quantity:1}))
  }
  useEffect(() =>
  {
    if (priceLess !== 300) {
      dispatch(fetchFilteredProductsAction({ keyword, currentPage, priceLess, category, ratings }));
    } else if (priceGreater !== 0) {
      dispatch(fetchFilteredProductsAction({ keyword, currentPage, priceGreater, category, ratings }));
    } else
    {
      dispatch(fetchFilteredProductsAction({ keyword, currentPage, category, ratings }));
    }
  }, [dispatch, keyword, priceLess, priceGreater, category, ratings, currentPage])
  useEffect(() => {
    dispatch(fetchCategoriesAction())
  }, [])
  
  return (
    <div className="products">
      <div className="products__header">
        <div className="container">
          <div className="products__header__txt"> all products </div>
          <div className="products__header__breadcrumbs">
            <MuiBreadcrumbs items={[{ title: 'home', link: '/' }, { title: 'products', link: '/products' }]} />
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="products__sidebar">
          <div className="products__sidebar__header">filter by</div>
          <div className="products__sidebar__filteredProps">
            {activeFilter.length > 0 && activeFilter.map((item, i) => (
              <div key={i} className={`products__sidebar__filteredProps__item ${item === 'hide' || item == [0, 300] ? 'hide' : ''}`}>
                <div className="products__sidebar__filteredProps__item__del" onClick={() => removeActiveFilter(item)}>
                  <CloseIcon/>
                </div> 
                {
                  item.type === 'ratings' ?
                  <Rating value={item?.payload} readOnly precision={.5} size="small" color="" /> : item.payload
                }
              </div>
            ))}
          </div>
          <form className="products__sidebar__sections">
            {/* C A T E G O R Y */}
            <Accordion>
              <Accordion.Item eventKey="0" className="products__sidebar__sections__category">
                <Accordion.Header className="products__sidebar__sections__category__title">category</Accordion.Header>
                <Accordion.Body className="products__sidebar__sections__category__list">
                  {
                    categories?.map((c,i) => (
                      <div key={i} className="products__sidebar__sections__category__list__item">
                        <p className={`products__sidebar__sections__category__list__item__txt ${category === c.title ? 'active' : ''}`} onClick={() => categoryHandler(c.title)}> {c.title} </p>
                      </div>
                    ))
                  }
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            
            {/* P R I C E */}
            <Accordion>
              <Accordion.Item className="products__sidebar__sections__price">
                <Accordion.Header className="products__sidebar__sections__price__title"> price </Accordion.Header>
                <Accordion.Body>
                  <p className='products__sidebar__sections__price__limit'> less than </p>

                  <Slider
                    value={priceLess}
                    onChange={(e, price) =>
                    {
                      setPriceLess(price);
                      setPriceGreater(0)
                    }}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={7}
                    max={300}
                  />
                  <p className='products__sidebar__sections__price__limit'> greater than </p>

                  <Slider
                    value={priceGreater}
                    onChange={(e, price) =>
                    {
                      setPriceGreater(price);
                      setPriceLess(300);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={7}
                    max={300}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* R A T I N G */}
            <Accordion>
              <Accordion.Item className="products__sidebar__sections__rating">
                <Accordion.Header className="products__sidebar__sections__rating__title">
                  rating
                </Accordion.Header>
                <Accordion.Body>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) =>
                    {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </form>
        </div>
        <div className="products__right">
          <div className="products__right__search">
            <input type="text" placeholder='search ...' value={keyword} onChange={e => setKeyword(e.target.value)} />
            <div className="products__right__search__icon">
              <SearchIcon/>
            </div>
          </div>
            
            {loading ? (
              <div className="spinner">
                <Spinner animation="border" variant="danger" />            
              </div>
            ) : products?.length < 1 ? (
              <div className="products__right__items">
                  there is no products with that filter
              </div>
            ) : (
                <div className="products__right__items">
                  {products?.map(p => (
                    <Link key={p._id} href={`/product/${p._id}`}>
                      <a className="products__right__items__item">

                        <div className="products__right__items__item__img">
                          <Image src={p.images[0]?.url} layout="fill" objectFit='contain' alt='productImage' />
                        </div>
                        <div className="products__right__items__item__info">
                          <div className="products__right__items__item__info__name">
                            {p.name}
                          </div>
                          <div className="products__right__items__item__info__rating">
                            <Rating value={p?.ratings} readOnly precision={.5} size="small" />
                          </div>
                          <div className="products__right__items__item__info__price">
                            ${p.price}
                          </div>
                        </div>
                        <div className="products__right__items__item__addToCart" onClick={() => addToCartHandler(p)}>
                          add to cart
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
          )}
          <div className="products__right__pagination"> 
            <Pagination count={paginationResult?.numberOfPages } variant="outlined" color="secondary" onChange={handleChange} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Products