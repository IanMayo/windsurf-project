import React, { useState, useEffect } from 'react'
import Controls from './Controls'
import SpectrogramPlot from './SpectrogramPlot'
import SpatialPlot from './SpatialPlot'
import type { ShipParams, Point } from '../utils/simulation'
import { calculateShipPaths, calculateSpectrogramData } from '../utils/simulation'
import { useDebounce } from '../hooks/useDebounce'

interface SpectrogramDataPoint {
  time: number
  frequency: number
}

const SpectrogramTrainer: React.FC = () => {
  const [params, setParams] = useState<ShipParams>({
    sensorSpeed: 10,
    sensorCourse: 0,
    sourceSpeed: 15,
    sourceCourse: 325,
    sourceInitialBearing: 45,
    sourceInitialRange: 12,
    sourceFrequency: 400,
  })

  const [duration, setDuration] = useState(3600) // in seconds
  const [timeStep, setTimeStep] = useState(1) // in minutes

  const [sensorPath, setSensorPath] = useState<Point[]>([])
  const [sourcePath, setSourcePath] = useState<Point[]>([])
  const [spectrogramData, setSpectrogramData] = useState<SpectrogramDataPoint[] | null>(null)

  const debouncedParams = useDebounce(params, 50)
  const debouncedDuration = useDebounce(duration, 50)

  useEffect(() => {
        const { sensorPath, sourcePath } = calculateShipPaths(debouncedParams, debouncedDuration, timeStep)
    const spectrogramData = calculateSpectrogramData(debouncedParams, sensorPath, sourcePath, timeStep)
    setSensorPath(sensorPath)
    setSourcePath(sourcePath)
    setSpectrogramData(spectrogramData)
  }, [debouncedParams, debouncedDuration, timeStep])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Controls params={params} setParams={setParams} duration={duration} setDuration={setDuration} timeStep={timeStep} setTimeStep={setTimeStep} />
      <div style={{ display: 'flex', flex: 1, maxHeight: '50vh' }}>
        <div style={{ flex: 1, border: '1px solid black', margin: '10px' }}>
          {spectrogramData && <SpectrogramPlot data={spectrogramData} />}
        </div>
        <div style={{ flex: 1, border: '1px solid black', margin: '10px' }}>
          <SpatialPlot paths={{ sensorPath, sourcePath }} />
        </div>
      </div>
    </div>
  )
}

export default SpectrogramTrainer
