import React from 'react'
import CircularSlider from '@fseehawer/react-circular-slider'

interface CompassControlProps {
  label: string
  value: number
  onChange: (value: number) => void
}

const CompassControl: React.FC<CompassControlProps> = ({ label, value, onChange }) => {
  const handleSliderChange = (sliderValue: string | number) => {
    const numericValue = typeof sliderValue === 'string' ? parseInt(sliderValue, 10) : sliderValue
    if (!isNaN(numericValue)) {
      onChange(numericValue)
    }
  }

  return (
    <div style={{ position: 'relative', width: 130, height: 130, margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>{label}</span>
      <div style={{ position: 'relative', width: 105, height: 105 }}>
        <CircularSlider
          min={0}
          max={359}
          initialValue={value}
          onChange={handleSliderChange}
          knobColor="#333"
          progressColorFrom="#56CCF2"
          progressColorTo="#2F80ED"
          trackColor="#e0e0e0"
          width={105}
          knobSize={17}
          progressSize={8}
          trackSize={8}
          hideLabelValue={true}
        />
        <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#555' }}>N</div>
        <div style={{ position: 'absolute', top: '50%', right: -5, transform: 'translateY(-50%)', fontSize: '12px', color: '#555' }}>E</div>
        <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#555' }}>S</div>
        <div style={{ position: 'absolute', top: '50%', left: -5, transform: 'translateY(-50%)', fontSize: '12px', color: '#555' }}>W</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.1rem', fontWeight: 'bold' }}>
          {value}°
        </div>
      </div>
    </div>
  )
}

export default CompassControl
