import { MazeDTO, MouseDTO } from './../../../api/gen/api'
import { MousePosition, ResultState } from './resultSlice'

interface TimeEstimatorInput {
  maze: MazeDTO
  mouse: MouseDTO
  positions: MousePosition[]
  state: ResultState
}

const initEstimatedTimes = (
  { isFullSize }: MazeDTO,
  { acceleration: a, deceleration: d, maxSpeed: vMax }: MouseDTO
) => {
  const cellSize = isFullSize ? 0.18 : 0.09 // 18cm vs 9cm
  const maxSpeedReachingDistance = (vMax * vMax) / (2 * a) + (vMax * vMax) / (2 * d)
  const timeWithoutReachingMaxSpeed = (s: number) => {
    let vTop = Math.sqrt((2 * a * d * s) / (a + d))
    const t = vTop / a + vTop / d
    return t
  }
  const timeWithPeakingAtMaxSpeed = (s: number) => {
    const t = vMax / a + vMax / d + (s - maxSpeedReachingDistance) / vMax
    return t
  }

  const estimatedTimeByStep = []
  estimatedTimeByStep[0] = 0
  for (let i = 1; i < 32; i++) {
    const s = i * cellSize
    estimatedTimeByStep[i] =
      s < maxSpeedReachingDistance ? timeWithoutReachingMaxSpeed(s) : timeWithPeakingAtMaxSpeed(s)
  }
  return estimatedTimeByStep
}

export const estimateTime = ({ maze, mouse, positions, state }: TimeEstimatorInput) => {
  const estimatedTimeByStep = initEstimatedTimes(maze, mouse)
  const turnTime = mouse.turnTime
  const calcRunTime = (startIndex: number, endIndex: number) => {
    let estimatedTime = 0
    let previousDirection = positions[startIndex].direction
    let forwardStepCount = 1

    for (let i = startIndex + 1; i <= endIndex; i++) {
      if (i === endIndex) {
        estimatedTime += estimatedTimeByStep[forwardStepCount]
        break
      }
      const currentDirection = positions[i].direction
      if (currentDirection !== previousDirection) {
        estimatedTime += estimatedTimeByStep[forwardStepCount]
        const turnDiff = Math.abs(currentDirection - previousDirection)
        const numberOfTurns = turnDiff === 1 || turnDiff === 3 ? 1 : 2
        estimatedTime += numberOfTurns * turnTime
        previousDirection = currentDirection
        forwardStepCount = 1
      } else {
        forwardStepCount += 1
      }
    }
    return estimatedTime
  }

  state.mazeRuns?.forEach((mazeRun) => {
    const { startIndex, goalReachedIndex, endIndex } = mazeRun

    mazeRun.fullRunTime = calcRunTime(startIndex, endIndex)
    if (goalReachedIndex) {
      mazeRun.mazeRunTime = calcRunTime(startIndex, goalReachedIndex)
      mazeRun.searchBackTime = mazeRun.fullRunTime - mazeRun.mazeRunTime
    }
  })
}
