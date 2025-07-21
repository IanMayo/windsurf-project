import React from 'react'
import type { ShipParams } from '../utils/simulation'

interface ControlsProps {
  params: ShipParams;
  setParams: React.Dispatch<React.SetStateAction<ShipParams>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const Controls: React.FC<ControlsProps> = ({ params, setParams, duration, setDuration }) => {
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Sensor Speed (m/s): {params.sensorSpeed}</label>
          <input
            type='range'
            name='sensorSpeed'
            min='0'
            max='30'
            step='1'
            value={params.sensorSpeed}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Sensor Course (deg): {params.sensorCourse}</label>
          <input
            type='range'
            name='sensorCourse'
            min='0'
            max='359'
            step='1'
            value={params.sensorCourse}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Source Speed (m/s): {params.sourceSpeed}</label>
          <input
            type='range'
            name='sourceSpeed'
            min='0'
            max='30'
            step='1'
            value={params.sourceSpeed}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Source Course (deg): {params.sourceCourse}</label>
          <input
            type='range'
            name='sourceCourse'
            min='0'
            max='359'
            step='1'
            value={params.sourceCourse}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Initial Range (km): {params.sourceInitialRange}</label>
          <input
            type='range'
            name='sourceInitialRange'
            min='1'
            max='150'
            step='1'
            value={params.sourceInitialRange}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Initial Bearing (deg): {params.sourceInitialBearing}</label>
          <input
            type='range'
            name='sourceInitialBearing'
            min='0'
            max='359'
            step='1'
            value={params.sourceInitialBearing}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Source Frequency (Hz): {params.sourceFrequency}</label>
          <input
            type='range'
            name='sourceFrequency'
            min='100'
            max='1000'
            step='10'
            value={params.sourceFrequency}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flexBasis: '25%', padding: '10px' }}>
          <label>Duration (minutes): {duration}</label>
          <input
            type='range'
            name='duration'
            min='0'
            max='600'
            step='1'
            value={duration}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Controls
