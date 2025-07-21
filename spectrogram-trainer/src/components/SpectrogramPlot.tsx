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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

interface SpectrogramDataPoint {
  time: number;
  frequency: number;
}

interface SpectrogramPlotProps {
  data: SpectrogramDataPoint[];
}

const SpectrogramPlot: React.FC<SpectrogramPlotProps> = ({ data: spectrogramData }) => {
  const data = {
    datasets: [
      {
        label: 'Received Frequency',
        // Map frequency to x-axis and time to y-axis
        data: spectrogramData.map(p => ({ x: p.frequency, y: p.time })),
        backgroundColor: 'rgba(255, 159, 64, 1)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
          text: 'Frequency (Hz)',
        },
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Time (seconds)',
        },
      },
    },
    aspectRatio: 1,
    maintainAspectRatio: true,
  }

  return <Scatter data={data} options={options} />
}

export default SpectrogramPlot
