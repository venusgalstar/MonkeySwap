import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'

const DoughnutChart = ({ owned, notOwned }: { owned: number, notOwned: number }) => {
  Chart.register(ArcElement)

  const data = {
    labels: ['Owned', 'Not Owned'],
    datasets: [
      {
        data: [owned, notOwned],
        backgroundColor: ['#38A611', '#F4BE37'],
        hoverBackgroundColor: ['#38A611', '#F4BE37'],
        borderWidth: 0,
      },
    ],
  }

  return (
    <>
      {
        data && (
          <Doughnut data={data} />
        )
      }
    </>)
}

export default DoughnutChart
