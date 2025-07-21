import React from 'react'
import CompassControl from './CompassControl'
import type { ShipParams } from '../utils/simulation'

interface ControlsProps {
  params: ShipParams;
  setParams: React.Dispatch<React.SetStateAction<ShipParams>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const Controls: React.FC<ControlsProps> = ({ params, setParams, duration, setDuration }) => {
  const verticalSliderStyle: React.CSSProperties = {
    writingMode: 'vertical-lr',
    height: '150px',
    marginLeft: '20px',
  }

    const handleCompassChange = (name: keyof ShipParams) => (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'duration') {
      setDuration(Number(value));
    } else {
      setParams((prevParams: ShipParams) => ({
        ...prevParams,
        [name]: Number(value),
      }));
    }
  }

  return (
    <div style={{ padding: '10px', border: '1px solid black', margin: '10px' }}>
      <h2>Controls</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {/* Sensor Group */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
          <CompassControl label="Sensor Course" value={params.sensorCourse} onChange={handleCompassChange('sensorCourse')} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Speed (m/s): {params.sensorSpeed}</label>
            <input type='range' name='sensorSpeed' min='0' max='30' step='1' value={params.sensorSpeed} onChange={handleChange} style={verticalSliderStyle} />
          </div>
        </div>

        {/* Source Group */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
          <CompassControl label="Source Course" value={params.sourceCourse} onChange={handleCompassChange('sourceCourse')} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Speed (m/s): {params.sourceSpeed}</label>
            <input type='range' name='sourceSpeed' min='0' max='30' step='1' value={params.sourceSpeed} onChange={handleChange} style={verticalSliderStyle} />
          </div>
        </div>

        {/* Initial Position Group */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
          <CompassControl label="Initial Bearing" value={params.sourceInitialBearing} onChange={handleCompassChange('sourceInitialBearing')} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>Range (km): {params.sourceInitialRange}</label>
            <input type='range' name='sourceInitialRange' min='1' max='150' step='1' value={params.sourceInitialRange} onChange={handleChange} style={verticalSliderStyle} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px', justifyContent: 'center' }}>
        <div style={{ flexBasis: '40%', padding: '10px' }}>
            <label>Source Frequency (Hz): {params.sourceFrequency}</label>
            <input type='range' name='sourceFrequency' min='100' max='1000' step='10' value={params.sourceFrequency} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <div style={{ flexBasis: '40%', padding: '10px' }}>
            <label>Duration (minutes): {duration}</label>
            <input type='range' name='duration' min='0' max='600' step='1' value={duration} onChange={handleChange} style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  )
}

export default Controls
