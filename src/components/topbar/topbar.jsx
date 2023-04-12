import React from 'react'
import './topbar.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">MetaDeSC</span>
        </div>
        <div className="topRight">
          <div className="topIconCountainer">
            <NotificationsIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topIconCountainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topIconCountainer">
            <SettingsIcon />
          </div>
          <img src="./images/images.jpg" className='topAvatar' />
        </div>
      </div>
    </div>
  )
}
