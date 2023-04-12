import React from 'react'
import './Chart.css'
import {
    ResponsiveContainer,
    Line,
    LineChart,
    XAxis,
    Tooltip,
    CartesianGrid
} from 'recharts'

export default function Chart({tittle, data, datakey, grid}) {
  return (
    <div className="chart">
        <h3 className='chartTittle' >{tittle}</h3>
        <ResponsiveContainer width='100%'aspect={4}>
            <LineChart data={data} >
                <XAxis dataKey="month" stroke='#5550bd' />
                <Line type="monotone" dataKey={datakey} stroke='#5550bd' />
                <Tooltip />
                {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='10' />}
            </LineChart>
        </ResponsiveContainer>

    </div>
  )
}
