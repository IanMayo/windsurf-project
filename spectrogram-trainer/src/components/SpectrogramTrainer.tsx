import React, { useState, useEffect } from 'react'
import Controls from './Controls'
import SpectrogramPlot from './SpectrogramPlot'
import SpatialPlot from './SpatialPlot'
import { ShipParams, Point, simulate, SpectrogramData } from '../utils/simulation'
import { useDebounce } from '../hooks/useDebounce'

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

  const [duration, setDuration] = useState(240) // in minutes

  const [sensorPath, setSensorPath] = useState<Point[]>([])
  const [sourcePath, setSourcePath] = useState<Point[]>([])
  const [spectrogramData, setSpectrogramData] = useState<SpectrogramData>({ labels: [], datasets: [] })

  const debouncedParams = useDebounce(params, 50)
  const debouncedDuration = useDebounce(duration, 50)

  useEffect(() => {
    const { sensorPath, sourcePath, spectrogramData } = simulate(debouncedParams, debouncedDuration)
    setSensorPath(sensorPath)
    setSourcePath(sourcePath)
    setSpectrogramData(spectrogramData)
  }, [debouncedParams, debouncedDuration])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Controls params={params} setParams={setParams} duration={duration} setDuration={setDuration} />
      <div style={{ display: 'flex', flex: 1, maxHeight: '50vh' }}>
        <div style={{ flex: 1, border: '1px solid black', margin: '10px' }}>
          <SpectrogramPlot data={spectrogramData} />
        </div>
        <div style={{ flex: 1, border: '1px solid black', margin: '10px' }}>
          <SpatialPlot sensorPath={sensorPath} sourcePath={sourcePath} />
        </div>
      </div>
    </div>
  )
}

export default SpectrogramTrainer
