import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
function Navbar() {
  return (
    <div className="dashboard__container__navbar">
      <div className="dashboard__container__navbar__search">
        <input type="text" />
        <div className="dashboard__container__navbar__search__icon"> <SearchIcon /> </div>
      </div>
      <div className="dashboard__container__navbar__links">
        <div className="dashboard__container__navbar__links__link"> <DarkModeOutlinedIcon/> </div>
        <div className="dashboard__container__navbar__links__link"> <NotificationsIcon/>  </div>
        <div className="dashboard__container__navbar__links__link"> <SettingsIcon/> </div>
      </div>
    </div>
  )
}

export default Navbar