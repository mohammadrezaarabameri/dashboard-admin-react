import React from 'react'
import './Feature.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CountUp from 'react-countup';

export default function Feature() {
  return (
    <div className="feature">
        <div className="featureItemRevanue">
            <span className="featureTittle">Revanue</span>
        <div className="featureContainer">
            <span className="featureMoney">$<CountUp start={0} end={2123}/></span>
            <span className="featureRate">
                -186 <ArrowDownwardIcon className='featureIcon negative' />
            </span>
        </div>
        <span className="featureSub">Compared to last month</span>
        </div>
        <div className="featureItemSales">
            <span className="featureTittle">Sales</span>
        <div className="featureContainer">
            <span className="featureMoney">$<CountUp start={0} end={4143}/></span>
            <span className="featureRate">
                -1.4 <ArrowDownwardIcon className='featureIcon negative' />
            </span>
        </div>
        <span className="featureSub">Compared to last month</span>
        </div>
        <div className="featureItemCost">
            <span className="featureTittle">Cost</span>
        <div className="featureContainer">
            <span className="featureMoney">$<CountUp start={0} end={2225}/></span>
            <span className="featureRate">
                +2.4 <ArrowUpwardIcon className='featureIcon' />
            </span>
        </div>
        <span className="featureSub">Compared to last month</span>
        </div>
    </div>
  )
}
