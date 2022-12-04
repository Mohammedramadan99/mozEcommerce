import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { incomeStatsAction, ordersStatsAction, monthOrdersStatsAction, usersStatsAction, weekSalesAction,allTimeStatsAction } from '../../store/statsSlice'
import Navbar  from './Navbar'
import Sidebar from './Sidebar'


function Dashboard({ childrenTwo })
{
  const [dashboardComponent, setDashboardComponent] = useState('dashboard')
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
        <div className="dashboard__container__wrapper">
          {childrenTwo}
        </div>
      </div>
    </div>
  )
}

export default Dashboard