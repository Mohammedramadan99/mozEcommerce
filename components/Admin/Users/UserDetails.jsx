import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetailsAction } from '../../../store/usersSlice'
import PhoneIcon from '@mui/icons-material/Phone'
import WebIcon from '@mui/icons-material/WebAsset'
import MailIcon from '@mui/icons-material/Mail'
import { useRouter } from 'next/router'
function UserDetails()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const { userDetails, loading } = useSelector(state => state.users)
  const activitiesData = [
    {
      title: "He gave a five-star rating to cubcake",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni eaque quod quasi, nam voluptatem atque harum ducimus iure aspernatur cum odit sapiente libero ea incidunt distinctio ullam praesentium sequi rerum."
    },
    {
      title: "he made a completed order",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni eaque quod quasi, nam voluptatem atque harum ducimus iure aspernatur cum odit sapiente libero ea incidunt distinctio ullam praesentium sequi rerum."
    },
    {
      title: "He reviewed us",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni eaque quod quasi, nam voluptatem atque harum ducimus iure aspernatur cum odit sapiente libero ea incidunt distinctio ullam praesentium sequi rerum."
    },
  ]
  useEffect(() => {
    dispatch(fetchUserDetailsAction(id))
  }, [])
  return (
    <div className='dashboard__container__userDetails__wrapper'>
      {loading ? (
        <>
          loading ... 
        </>
      ) : (
        <>
          <div className="dashboard__container__userDetails__wrapper__info">
            <div className="dashboard__container__userDetails__wrapper__info__title">
              user information
            </div>
            <div className="dashboard__container__userDetails__wrapper__info__profile">
              <div className="dashboard__container__userDetails__wrapper__info__profile__img">
                  {userDetails?.personalImage?.url && <Image src={userDetails?.personalImage?.url} layout="fill" objectFit='contain' alt="img" />}
              </div>
              <div className="dashboard__container__userDetails__wrapper__info__profile__name">
                {userDetails?.name}
              </div>
            </div>
            <div className="dashboard__container__userDetails__wrapper__info__communication">
              <div className="dashboard__container__userDetails__wrapper__info__communication__title">
                communication
              </div>
              <div className="dashboard__container__userDetails__wrapper__info__communication__items">
                <div className="dashboard__container__userDetails__wrapper__info__communication__items__item">
                  <div className="dashboard__container__userDetails__wrapper__info__communication__items__item__icon">
                    <PhoneIcon />
                  </div>
                  <div className="dashboard__container__userDetails__wrapper__info__communication__items__item__tex">01121090068</div>
                </div>
                <div className="dashboard__container__userDetails__wrapper__info__communication__items__item">
                  <div className="dashboard__container__userDetails__wrapper__info__communication__items__item__icon">
                    <WebIcon />
                  </div>
                  <div className="dashboard__container__userDetails__wrapper__info__communication__items__item__txt">
                    moramadan.com
                  </div>
                </div>
                <div className="dashboard__container__userDetails__wrapper__info__communication__items__item">
                  <div className="dashboard__container__userDetails__wrapper__info__communication__items__item__icon">
                    <MailIcon />
                  </div>
                  <div className="dashboard__container__userDetails__wrapper__info__communication__items__item__txt">
                    {userDetails?.email}
                  </div>
                </div>
              </div>
              </div>
              <div className="dashboard__container__userDetails__wrapper__info__bio">
                <div className="dashboard__container__userDetails__wrapper__info__bio__title">biography</div>
                <div className="dashboard__container__userDetails__wrapper__info__bio__txt">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni eaque quod quasi, nam voluptatem atque harum ducimus iure aspernatur cum odit sapiente libero ea incidunt distinctio ullam praesentium sequi rerum.</div>
              </div>
          </div>
          <div className="dashboard__container__userDetails__wrapper__activities">
            <div className="dashboard__container__userDetails__wrapper__activities__title">
              user activities
              </div>
              <div className="dashboard__container__userDetails__wrapper__activities__items">
                {activitiesData.map((a,i) => (
                  <div key={ i }  className="dashboard__container__userDetails__wrapper__activities__items__item">
                    <div className="dashboard__container__userDetails__wrapper__activities__items__item__title"> {a.title} </div>
                    <div className="dashboard__container__userDetails__wrapper__activities__items__item__content"> {a.content} </div>
                  </div>
                ))}
              </div>
              
          </div>
        </>
      )}
      
    </div>
  )
}

export default UserDetails