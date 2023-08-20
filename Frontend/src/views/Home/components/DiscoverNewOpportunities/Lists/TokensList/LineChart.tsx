import { Box } from 'theme-ui'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const options = {
  maintainAspectRatio: false,
  legend: { display: false },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  tension: 0.6,
  elements: {
    point: {
      radius: 0,
    },
  },
}

interface LineChartProps {
  priceHistory: number[]
  isBullish: boolean
}

const LineChart = ({ priceHistory, isBullish }: LineChartProps) => {
  const data = {
    labels: priceHistory,
    datasets: [
      {
        data: priceHistory,
        borderColor: isBullish ? '#38A611' : '#DF4141',
        borderWidth: 2,
      },
    ],
  }

  return (
    <Box sx={{ maxWidth: '100px', height: '25px' }}>
      <Line options={options} data={data} />
    </Box>
  )
}

export default LineChart
