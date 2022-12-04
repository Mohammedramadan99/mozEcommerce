import React, { useEffect } from 'react'
import Header from '../Header'
import {deleteNotificationAction, fetchNotificationsAction, reset} from '../../../store/notificationsSlice'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import moment from 'moment'
import CloseIcon from '@mui/icons-material/Close'
function Notifications()
{
  const { allNotifications,isDeleted } = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const deleteNotofication = id =>
  {
    dispatch(deleteNotificationAction(id))
  }
  useEffect(() => {
    dispatch(fetchNotificationsAction())
  }, [dispatch])
  if (isDeleted) {
    dispatch(reset())
    dispatch(fetchNotificationsAction())
  }
  return (
    <div className="dashboard__container__notifications">
      <Header title='notifications' />
      <div className="dashboard__container__notifications__wrapper">
        <div className="dashboard__container__notifications__wrapper__bar">

        </div>
        <div className="dashboard__container__notifications__wrapper__items">
          {allNotifications?.map(item => (
            <div key={item._id} className="dashboard__container__notifications__wrapper__items__item">
              <div className="dashboard__container__notifications__wrapper__items__item__img ">
                <Image src={item?.user?.personalImage?.url} layout='fill' objectFit="contain" alt="img" />
              </div>
              <div className="dashboard__container__notifications__wrapper__items__item__content">
                <div className="dashboard__container__notifications__wrapper__items__item__content__title">
                  {item?.title}
                </div>
                <div className="dashboard__container__notifications__wrapper__items__item__content__desc">
                  {item?.content}
                </div>
                <div className="dashboard__container__notifications__wrapper__items__item__content__time">
                  {
                    moment(item?.createdAt)?.fromNow()
                  }
                </div>
              </div>
              <div className="dashboard__container__notifications__wrapper__items__item__close">
                <div className="dashboard__container__notifications__wrapper__items__item__close__icon" onClick={() => deleteNotofication(item._id)} >
                  <CloseIcon/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notifications