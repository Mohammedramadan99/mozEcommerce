import { useSelector } from "react-redux"

function AllTime()
{
  const {allTime} = useSelector(state => state.stats)
  return (
    <div className='dashboard__container__content__mainPage__right__allTime'>
      <div className="dashboard__container__content__mainPage__right__allTime__title">all time</div>
      <div className="dashboard__container__content__mainPage__right__allTime__items">
          {allTime?.map((item,i) => (
            <div key={i} className="dashboard__container__content__mainPage__right__allTime__items__item">
              <div className="dashboard__container__content__mainPage__right__allTime__items__item__name"> {item?.title} </div>
              <div className="dashboard__container__content__mainPage__right__allTime__items__item__number">
                {item.title === "earnings" ? `$${item?.num.toLocaleString()}` : item?.num }
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllTime