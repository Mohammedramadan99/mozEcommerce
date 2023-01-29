import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Logo from '../logo/Logo'
import Link from "next/link";
import { useRouter } from "next/router";
function Sidebar()
{
  const router = useRouter()
  const sidebarData = [
    {
      title: 'main',
      items: [{ name: 'dashboard', icon: <DashboardIcon /> }],
      part:'One'
    },
    {
      title: 'lists',
      items: [{ name: 'users', icon: <PersonOutlineIcon /> }, { name: 'products', icon: <StoreIcon /> }, { name: 'orders', icon: <LocalShippingIcon /> }, { name: 'category', icon: <CategoryIcon /> }],
      part:'Two'
    },
    {
      title: 'useful',
      items: [{ name: 'status', icon: <InsertChartIcon /> }, { name: 'notifications', icon: <NotificationsNoneIcon /> }],
      part:'Three'
    }
  ]
  
  return (
    <div className="dashboard__sidebar">
      <div className="dashboard__sidebar__logo"> 
        <Logo/> 
      </div> 
      <div className="dashboard__sidebar__parts">
        {sidebarData.map((item,i) => (
          <div key={i} className={`dashboard__sidebar__parts__singlePart`}>
            <div className={`dashboard__sidebar__parts__singlePart__title`}>
              {item.title}
            </div>
            <div className={`dashboard__sidebar__parts__singlePart__items`}>
              {item.items.map((link,i) => (
                <Link 
                href={link.name === 'dashboard' ? `/dashboard` : link.name === 'status' || link.name === 'notifications' ?  `/dashboard` : `/dashboard/${link?.name}`}
                key={i}>
                  <a className={router.asPath.endsWith(link?.name?.toLowerCase()) ? `dashboard__sidebar__parts__singlePart__items__item active` : `dashboard__sidebar__parts__singlePart__items__item` }>
                    <div className={`dashboard__sidebar__parts__singlePart__items__item__icon`}>
                      {link.icon}
                    </div>
                    <div className={`dashboard__sidebar__parts__singlePart__items__item__name`}>
                      {link.name}
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar