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

export function GraphCacheHitRatio() {
  const { time, setTime } = useContext(RedisContext)
  const { keyHits, setKeyHits } = useContext(RedisContext)
  const { keyMisses, setKeyMisses } = useContext(RedisContext)
  const { rss, setRss } = useContext(RedisContext);

  let cacheHitRatioRaw = (+keyHits[keyHits.length-1]/(keyMisses[keyHits.length-1] + keyHits[keyHits.length-1]))
  const cacheHitRatio = cacheHitRatioRaw ? cacheHitRatioRaw.toFixed(2) : 0 ;

  const options: object = {
    responsive: true,
    aspectRatio:
    1 | 1,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#dadada'
        }
      },
      title: {
        display: true,
        text: `Cache Hit Ratio: ${cacheHitRatio}`,
        font: {
          size: 22,
          family: "'Helvetica', 'serif'"
        },
        color: '#dadada', padding: 0
      },
    },
  }
  const labels: string[] = time

  const data = {
    labels,
    datasets: [
      {
        label: 'Key Space Hits',
        data: keyHits,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Key Space Misses',
        data: keyMisses,
        borderColor: 'rgb(79, 189, 186)',
        backgroundColor: 'rgba(79, 189, 186, 0.5)',
      }
    ],
  }

  const legendMargin = {
    id: "legendMargin",
    beforeInit: function (chart) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return (this.height += 14);
      };
    }
  };

  return <Line options={options} data={data} plugins={[legendMargin]}/>
}
