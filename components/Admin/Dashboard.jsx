import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { incomeStatsAction, ordersStatsAction, monthOrdersStatsAction, usersStatsAction, weekSalesAction,allTimeStatsAction } from '../../store/statsSlice'
import Category from './Category/Category'
import EditCategory from './Category/EditCategory'
import NewCategory from './Category/NewCategory'
import Header from './Header'
import MainPage from './MainPage/MainPage'
import Navbar  from './Navbar'
import OrderDetails from './Orders/OrderDetails'
import Orders from './Orders/Orders'
import EditProduct from './products/EditProduct'
// const EditProduct = dynamic(() => import("./products/EditProduct"));
import ProductDetails from './products/ProductDetails'
import Products from './products/Products'
import Sidebar from './Sidebar'
import UserDetails from './Users/UserDetails'
import Users from './users/Users'

function Dashboard({ childrenTwo })
{
  const [dashboardComponent, setDashboardComponent] = useState('dashboard')
  const [productId, setProductId] = useState('')
  const [userId, setUserId] = useState('')
  const [orderId, setOrderId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const dispatch = useDispatch()
  const numbers = true
  useEffect(() =>
  {
    if (dashboardComponent === "dashboard")
    {
      dispatch(usersStatsAction())
      dispatch(ordersStatsAction())
      dispatch(incomeStatsAction())
      dispatch(weekSalesAction())
      dispatch(monthOrdersStatsAction())
      dispatch(allTimeStatsAction(numbers))
    }
  }, [dispatch]) 
  return (
    <div className='dashboard'>
      <Sidebar setDashboardComponent={setDashboardComponent} />
      <div className="dashboard__container">
        <Navbar />
        {/* <div className="dashboard__container__wrapper">
          {dashboardComponent === "dashboard" ?
            (
              <div className="dashboard__container__content">
                <Header title='dashboard' />
                <MainPage />
              </div>
            )
            : dashboardComponent === "products" ?
            (
                <div className="dashboard__container__products">
                  <Header title='products' />
                  <Products setProductId={setProductId} setDashboardComponent={setDashboardComponent} />
                </div>
            )
            : dashboardComponent === "productDetails" ?
            (
                <div className="dashboard__container__productDetails">
                  <Header title='product view' />
                  <ProductDetails id={productId} />
                </div>
            )
              : dashboardComponent === "editProduct" ?
            (
                <div className="dashboard__container__editProduct">
                  <Header title='edit product' />
                  <EditProduct id={productId} setDashboardComponent={setDashboardComponent} />
                </div>
            )
            : dashboardComponent === "users" ?
            (
                <div className="dashboard__container__users">
                  <Header title='users' />
                      <Users setUserId={setUserId} setDashboardComponent={setDashboardComponent} />
                </div>
            )
            : dashboardComponent === "userDetails" ?
            (
                <div className="dashboard__container__userDetails">
                  <Header title='user profile' />
                  <UserDetails id={userId} />
                </div>
            )
            : dashboardComponent === "orders" ?
            (
                <div className="dashboard__container__orders">
                  <Header title='orders' />
                  <Orders setOrderId={setOrderId} setDashboardComponent={setDashboardComponent} />
                </div>
            )
          : dashboardComponent === "orderDetails" ?
          (
          <div className="dashboard__container__orderDetails">
            <Header title='order details' />
            <OrderDetails id={orderId} />
          </div>
          )
          : dashboardComponent === "categories" ?
          (
          <div className="dashboard__container__orderDetails">
            <Header title='categories' />
            <Category setCategoryId={setCategoryId} setDashboardComponent={setDashboardComponent} />
          </div>
          )
          : dashboardComponent === "editCategory" ?
          (
            <div className="dashboard__container__editCategory">
                <Header title='edit category' />
                <EditCategory id={categoryId} setDashboardComponent={setDashboardComponent} />
            </div>
          )
          : dashboardComponent === "addCategory" &&
          (
          <div className="dashboard__container__orderDetails">
            <Header title='edit category' />
            <NewCategory setDashboardComponent={setDashboardComponent} />
          </div>
          )
            }
        </div> */}
        <div className="dashboard__container__wrapper">
          {childrenTwo}
        </div>
      </div>
    </div>
  )
}

export default Dashboard