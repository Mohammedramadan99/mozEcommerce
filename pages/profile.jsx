import dynamic from 'next/dynamic'
const Profile = dynamic(
  () => import('../components/Profile/Profile'),
  { ssr: false }
)


function profile()
{
  
  return <Profile/>
    
}

export default profile