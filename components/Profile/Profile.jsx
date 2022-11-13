import { useSelector } from 'react-redux'

function Profile()
{
  const { userAuth } = useSelector(state => state.users)

  return (
    <div className="profile">
      
    </div>
  )
}

export default Profile