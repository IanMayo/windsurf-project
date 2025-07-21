export interface ShipParams {
  sensorSpeed: number; // m/s
  sensorCourse: number; // degrees
  sourceSpeed: number; // m/s
  sourceCourse: number; // degrees
  sourceInitialRange: number; // km
  sourceInitialBearing: number; // degrees
  sourceFrequency: number; // Hz
}

export interface Point {
  x: number; // meters
  y: number; // meters
}

// Function to convert degrees to radians
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

// Function to convert bearing (degrees from North) to Cartesian angle (radians from +X axis)
const bearingToCartesian = (bearing: number): number => {
  return toRadians(90 - bearing)
}

/**
 * Calculates the positions of the sensor and source ships over a given duration.
 * @param params - The simulation parameters.
 * @param duration - The total simulation time in seconds.
 * @param timeStep - The time interval between position calculations in seconds.
 * @returns An object containing the paths of the sensor and source ships.
 */
export const SPEED_OF_SOUND_IN_WATER = 1500 // m/s

/**
 * Calculates the received frequency at each time step based on the Doppler effect.
 * @param params - The simulation parameters.
 * @param sensorPath - The path of the sensor ship.
 * @param sourcePath - The path of the source ship.
 * @param timeStep - The time interval between calculations.
 * @returns An array of { time, frequency } data points.
 */
export const calculateSpectrogramData = (
  params: ShipParams,
  sensorPath: Point[],
  sourcePath: Point[],
  timeStep: number,
) => {
  const spectrogramPoints: { time: number; frequency: number }[] = []

  const sensorAngle = bearingToCartesian(params.sensorCourse)
  const sensorVx = params.sensorSpeed * Math.cos(sensorAngle)
  const sensorVy = params.sensorSpeed * Math.sin(sensorAngle)

  const sourceAngle = bearingToCartesian(params.sourceCourse)
  const sourceVx = params.sourceSpeed * Math.cos(sourceAngle)
  const sourceVy = params.sourceSpeed * Math.sin(sourceAngle)

  for (let i = 0; i < sensorPath.length; i++) {
    const p_r = sensorPath[i]
    const p_s = sourcePath[i]

    const dx = p_s.x - p_r.x
    const dy = p_s.y - p_r.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance === 0) {
      // Avoid division by zero; frequency is undefined at the exact same spot
      // Or we can just use the source frequency
      spectrogramPoints.push({ time: i * timeStep, frequency: params.sourceFrequency })
      continue
    }

    // Unit vector from receiver to source
    const ux = dx / distance
    const uy = dy / distance

    // Velocity of receiver along line of sight (positive if moving towards source)
    const vr_los = sensorVx * ux + sensorVy * uy

    // Velocity of source along line of sight (positive if moving towards receiver)
    const vs_los = -(sourceVx * ux + sourceVy * uy)

    // Doppler effect formula: f_r = f_s * (c + v_r) / (c - v_s)
    const c = SPEED_OF_SOUND_IN_WATER
    const receivedFrequency = params.sourceFrequency * (c + vr_los) / (c + vs_los)

    spectrogramPoints.push({ time: i * timeStep, frequency: receivedFrequency })
  }

  return spectrogramPoints
}

export const calculateShipPaths = (
  params: ShipParams,
  duration: number, // seconds
  timeStep: number, // seconds
) => {
  const sensorPath: Point[] = []
  const sourcePath: Point[] = []

  // Sensor's velocity components
  const sensorAngle = bearingToCartesian(params.sensorCourse)
  const sensorVx = params.sensorSpeed * Math.cos(sensorAngle)
  const sensorVy = params.sensorSpeed * Math.sin(sensorAngle)

  // Source's initial position
  const sourceInitialAngle = bearingToCartesian(params.sourceInitialBearing)
  const sourceInitialX = params.sourceInitialRange * 1000 * Math.cos(sourceInitialAngle)
  const sourceInitialY = params.sourceInitialRange * 1000 * Math.sin(sourceInitialAngle)

  // Source's velocity components
  const sourceAngle = bearingToCartesian(params.sourceCourse)
  const sourceVx = params.sourceSpeed * Math.cos(sourceAngle)
  const sourceVy = params.sourceSpeed * Math.sin(sourceAngle)

  for (let t = 0; t <= duration; t += timeStep) {
    // Calculate sensor position at time t (starts at origin)
    const sensorX = sensorVx * t
    const sensorY = sensorVy * t
    sensorPath.push({ x: sensorX, y: sensorY })

    // Calculate source position at time t
    const sourceX = sourceInitialX + sourceVx * t
    const sourceY = sourceInitialY + sourceVy * t
    sourcePath.push({ x: sourceX, y: sourceY })
  }

  return { sensorPath, sourcePath }
}
