import React, { useContext } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { RedisContext } from '../../context/RedisContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function MemoryUsage() {
  const { usedMemory, setUsedMemory } = useContext(RedisContext)
  const { time, setTime } = useContext(RedisContext)
  const { rss, setRss } = useContext(RedisContext)

  const options: object = {
    responsive: true,
    aspectRatio: 1 | 1,
    scales: {
      y: {
        ticks: {
          callback: function (val, index, ticks) {
            return Number.parseFloat(val).toExponential(2)
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#dadada',
          padding: 10,
        },
      },
      title: {
        display: true,
        position: 'top' as const,
        align: 'center' as const,
        text: 'Memory Usage: Used Memory vs RSS',
        font: {
          size: 22,
          family: "'Helvetica', 'serif'",
        },
        color: '#dadada',
        padding: 0,
      },
    },
  }
  const labels: string[] = time

  const data = {
    labels,
    datasets: [
      {
        label: 'Used Memory',
        data: usedMemory,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'RSS (Available Memory)',
        data: rss,
        borderColor: 'rgb(79, 189, 186)',
        backgroundColor: 'rgba(79, 189, 186, 0.5)',
      },
    ],
  }

  const legendMargin = {
    id: 'legendMargin',
    beforeInit: function (chart) {
      const fitValue = chart.legend.fit
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)()
        return (this.height += 14)
      }
    },
  }

  return <Line options={options} data={data} plugins={[legendMargin]} />
}
