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

      const allPoints = [...paths.sensorPath, ...paths.sourcePath];
  const x_coords = allPoints.map((p) => p.x);
  const y_coords = allPoints.map((p) => p.y);

  const minX = Math.min(...x_coords);
  const maxX = Math.max(...x_coords);
  const minY = Math.min(...y_coords);
  const maxY = Math.max(...y_coords);

  const min = Math.min(minX, minY);
  const max = Math.max(maxX, maxY);

  const padding = (max - min) * 0.1; // 10% padding

  const options = {
    aspectRatio: 1,
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        min: min - padding,
        max: max + padding,
        title: {
          display: true,
          text: 'X (km)',
        },
      },
      y: {
        type: 'linear' as const,
        min: min - padding,
        max: max + padding,
        title: {
          display: true,
          text: 'Y (km)',
        },
      },
    },
    maintainAspectRatio: true,
  }

  return <Scatter data={data} options={options} />
}

export default SpatialPlot
