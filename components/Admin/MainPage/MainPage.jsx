import dynamic from 'next/dynamic'
import PersonIcon from '@mui/icons-material/Person'
import StoreIcon from '@mui/icons-material/Store'
import LineAxisIcon from '@mui/icons-material/LineAxis'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incomeStatsAction, ordersStatsAction, monthOrdersStatsAction, usersStatsAction, weekSalesAction } from '../../../store/statsSlice'
import Right from './Right/Right'
import { useRouter } from 'next/router'
import { Spinner } from "react-bootstrap";

const Chart = dynamic(() => import("./Chart"));

function MainPage()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { users: usersState, monthOrders:ordersState,income:incomeState,mounthStatsLoading} = useSelector(state => state.stats)
  const users = usersState ? usersState : []
  const usersPerc = users ? ((users[0]?.total - users[1]?.total) / users[1]?.total) * 100 : []
  const orders = ordersState ? ordersState : []
  const ordersPerc = orders.length > 1 ? ((orders[0]?.total - orders[1]?.total) / orders[1]?.total) * 100 : orders[0]?.total * 100
  const income = incomeState ? incomeState : []
  const incomePerc = income.length > 1 ? ((income[0]?.total - income[1]?.total) / income[1]?.total) * 100 : (income[0]?.total  / income[0]?.total) * 100 
  
  const statsData = [
    {
      icon: <PersonIcon />,
      digits: users[0]?.total ? users[0]?.total : "",
      isMoney: false,
      title: users[0]?.total > 1 ? "users" : "user",
      color: "#a4abc5",
      bgColor: "#a4abc51a",
      percentage: Math.ceil(usersPerc)
    },
    {
      icon: <StoreIcon />,
      digits: orders[0]?.total ? orders[0]?.total : "",
      isMoney: false,
      title: orders[0]?.total > 1 ? "orders" : "order",
      color: "#a4abc5",
      bgColor: "#a4abc51a",
      percentage: Math.ceil(ordersPerc)
    },
    {
      icon: <LineAxisIcon />,
      digits: income[0]?.total ? income[0]?.total / 100  : "",
      isMoney: true,
      title: "earnings",
      color: "#a4abc5",
      bgColor: "#a4abc51a",
      percentage: Math.ceil(incomePerc)
    },
  ]

  console.log("path", router.asPath)
  useEffect(() =>
  {
    dispatch(usersStatsAction())
    dispatch(ordersStatsAction())
    dispatch(incomeStatsAction()) 
    dispatch(weekSalesAction())
    dispatch(monthOrdersStatsAction())
  }, [dispatch]) 
  
  return (
    <div className='dashboard__container__content__mainPage'>
      {mounthStatsLoading ? (
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
          <div className="dashboard__container__content__mainPage__left">
            <div className="dashboard__container__content__mainPage__left__overview">
              <div className="dashboard__container__content__mainPage__left__overview__title">overview</div>
              <div className="dashboard__container__content__mainPage__left__overview__p">how your store is performing in the previous month</div>
              <div className="dashboard__container__content__mainPage__left__overview__stats">
                {
                  statsData.map( (item,i) => (
                  <div key={i} className="dashboard__container__content__mainPage__left__overview__stats__item">
                      <div className="dashboard__container__content__mainPage__left__overview__stats__item__middle">
                        <div className="dashboard__container__content__mainPage__left__overview__stats__item__middle__title">
                          {item?.title}
                        </div>
                        <div className="dashboard__container__content__mainPage__left__overview__stats__item__middle__no">
                          {item?.isMoney ? `$ ${item?.digits.toLocaleString()}` : item?.digits}
                        </div>
                      </div>
                      {item.percentage > 0 ? (
                        <div className="dashboard__container__content__mainPage__left__overview__stats__item__number pstv"> <ArrowUpwardIcon /> {item.percentage}% <span> last month </span>  </div>
                        ) : (
                        <div className="dashboard__container__content__mainPage__left__overview__stats__item__number ngtv"> <ArrowDownwardIcon /> {item.percentage}% <span> last month </span>  </div>
                      )}
                      <div className="dashboard__container__content__mainPage__left__overview__stats__item__icon" style={{ color: item.color, backgroundColor: item.bgColor }}> {item.icon} </div>
                  </div>
                  ))
                }

              </div>
            </div>
            <Chart />
          </div>
          <Right/>
        </>
      )}
    </div>
  )
}

export default MainPage