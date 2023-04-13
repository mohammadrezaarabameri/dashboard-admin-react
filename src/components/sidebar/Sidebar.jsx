import React from 'react'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

export default function Sidebar() {
  return (
<div className="sidebar">
    <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className='sidebarTittle'>Dashboard</h3>
            <ul className='sidebarList'>
                <NavLink to="/Home" className={(link) => link.isActive ? "sidebarListItem active" : "link"}>

                <li className="sidebarListItem ">
<LineStyleIcon className='sidebarIcon' />
Home
                </li>
                </NavLink>
                <li className="sidebarListItem">
<TimelineIcon className='sidebarIcon' />
Analytics
                </li>
                <li className="sidebarListItem">
<TrendingUpIcon className='sidebarIcon' />
Sales
                </li>
            </ul>
        </div>
        <div className="sidebarMenu">
            <h3 className='sidebarTittle'>Quick Menu</h3>
            <ul className='sidebarList'>
                <NavLink to= "/users" className= {(link) => link.isActive ? "sidebarListItem active" : "link"} >
                <li className="sidebarListItem">
<PermIdentityIcon className='sidebarIcon' />
User
                </li>
                </NavLink>
                <NavLink to= "/newUser" className= {(link) => link.isActive ? "sidebarListItem active" : "link"} >
                <li className="sidebarListItem">
<PersonAddAltIcon className='sidebarIcon' />
New User
                </li>
                </NavLink>
                <NavLink to= "/products" className= {(link) => link.isActive ? "sidebarListItem active" : "link"} >
                <li className="sidebarListItem">
<StorefrontIcon className='sidebarIcon' />
Products
                </li>
                </NavLink>
                <li className="sidebarListItem">
<AttachMoneyIcon className='sidebarIcon' />
Transaction                </li>
                <li className="sidebarListItem">
<BarChartIcon className='sidebarIcon' />
Reports
                </li>
            </ul>
        </div>
    </div>
</div>
    )
}
