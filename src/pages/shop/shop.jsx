import React, { useEffect, useState } from 'react'
import './shop.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/topbar';
import axios from 'axios';
import { apiRoutes } from '../../api/api';

export default function Shop() {
    const [shop, setShop] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
          .get(apiRoutes.shop.getAssetsInMarket, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            let { data } = res;
            setShop(data.result);
            console.log(shop);
          });
      }, []);
    
    
  return (
    <div>
    <Topbar />
    <div className="row">
      <Sidebar />
      <div className="list">
    <div className="shop">
    <div className="shopItemRevanue">
        <div className='shopItem'>
        <span className="shopTittle">Revanue</span>
        <img src='./images/images.jpg' className="shopimage"/>
        </div>
        <hr/>
        <div className='shopItem'>
        <span className="shopTittle">Number</span>
        <span  className="shopimage">20</span>
        </div>
        <div className='shopItem'>
        <span className="shopTittle">Price</span>
        <span  className="shopimage">10</span>
        </div>
    <div className="shopSub">
      <input type='number' className='inputBid' placeholder='Place Your Bid'></input>
    <button className='shopBid' >Submit</button>
    </div>
    </div>
    <div className="shopItemSales">
        <span className="shopTittle">Sales</span>
    <div className="shopContainer">
        <span className="shopMoney">$4,415</span>
        <span className="shopRate">
            -1.4 <ArrowDownwardIcon className='featureIcon negative' />
        </span>
    </div>
    <span className="shopSub">Compared to last month</span>
    </div>
    <div className="shopItemCost">
        <span className="shopTittle">Cost</span>
    <div className="shopContainer">
        <span className="shopMoney">$2,225</span>
        <span className="shopRate">
            +2.4 <ArrowUpwardIcon className='featureIcon' />
        </span>
    </div>
    <span className="shopSub">Compared to last month</span>
    </div>
</div>
</div>
</div>
</div>
  )
}
