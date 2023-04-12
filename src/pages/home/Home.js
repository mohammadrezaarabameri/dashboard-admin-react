import React from 'react'
import Feature from '../../components/features/Feature'
import { xAxisData } from '../../data'
import Chart from './../../components/chart/Chart'
import './Home.css'

export default function Home() {
  return (
    <div className='home'>
      <Feature />
      <Chart grid tittle="year sale" data={xAxisData} datakey="sale" />
    </div>
  )
}
