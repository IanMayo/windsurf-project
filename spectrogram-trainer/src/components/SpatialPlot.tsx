import React from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import type { Point } from '../utils/simulation'
import arrowPlugin from '../utils/chartjs-plugin-arrow'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  arrowPlugin,
)

interface SpatialPlotProps {
  paths: {
    sensorPath: Point[];
    sourcePath: Point[];
  }
}

const SpatialPlot: React.FC<SpatialPlotProps> = ({ paths }) => {
  const data = {
    datasets: [
      {
        label: 'Sensor Path',
        data: paths.sensorPath,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        showLine: true,
        pointRadius: 2,
      },
      {
        label: 'Source Path',
        data: paths.sourcePath,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        showLine: true,
        pointRadius: 2,
      },
    ],
  }

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'X (meters)',
        },
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Y (meters)',
        },
      },
    },
    aspectRatio: 1,
    maintainAspectRatio: true,
  }

  return <Scatter data={data} options={options} />
}

export default SpatialPlot
