import React, { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import Controls from './Controls'
import {
  calculateShipPaths,
  calculateSpectrogramData,
} from '../utils/simulation'
import SpatialPlot from './SpatialPlot'
import SpectrogramPlot from './SpectrogramPlot'
import type { ShipParams, Point } from '../utils/simulation'

interface ShipPaths {
  sensorPath: Point[];
  sourcePath: Point[];
}

interface SpectrogramDataPoint {
  time: number;
  frequency: number;
}

const SpectrogramTrainer: React.FC = () => {
  const [params, setParams] = useState<ShipParams>({
    sensorSpeed: 10,
    sensorCourse: 0,
    sourceSpeed: 15,
    sourceCourse: 325,
    sourceInitialRange: 12,
    sourceInitialBearing: 45,
    sourceFrequency: 500, // Default frequency in Hz
  })

  const [shipPaths, setShipPaths] = useState<ShipPaths>({ sensorPath: [], sourcePath: [] })
  const [spectrogramData, setSpectrogramData] = useState<SpectrogramDataPoint[]>([])
    const [duration, setDuration] = useState(60) // minutes

  const debouncedParams = useDebounce(params, 50)
  const debouncedDuration = useDebounce(duration, 50)

  useEffect(() => {
    const simulationDurationSeconds = debouncedDuration * 60
    const timeStep = 60 // 1 minute in seconds
    const paths = calculateShipPaths(debouncedParams, simulationDurationSeconds, timeStep)
    const specData = calculateSpectrogramData(
      debouncedParams,
      paths.sensorPath,
      paths.sourcePath,
      timeStep,
    )
    setShipPaths(paths)
    setSpectrogramData(specData)
  }, [debouncedParams, debouncedDuration])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1>Spectrogram Trainer</h1>
      <Controls params={params} setParams={setParams} duration={duration} setDuration={setDuration} />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, border: '1px solid black', margin: '10px' }}>
          <h2>Spectrogram</h2>
          <SpectrogramPlot data={spectrogramData} />
        </div>
        <div style={{ flex: 1, border: '1px solid black', margin: '10px' }}>
          <h2>Spatial Plot</h2>
          <SpatialPlot paths={shipPaths} />
        </div>
      </div>
    </div>
  )
}

export default SpectrogramTrainer

