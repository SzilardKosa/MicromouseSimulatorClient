import _ from 'lodash'
import { HistoryProcessorState } from './historyProcessor'
import { MouseDirection, MousePosition, ObservedWalls } from './resultSlice'
import { mod } from './utils'

interface CommandProcessorInput {
  state: HistoryProcessorState
  command: string
}

interface CommandProcessor {
  syntax: RegExp
  process: (state: CommandProcessorInput) => void
}

// Sensors
const frontWallExists = ({
  state: {
    processedHistory: { positions, observedWallsPrefixSum },
    currentStep,
    width,
    height,
  },
}: CommandProcessorInput) => {
  let { x, y, direction } = positions[currentStep]
  let observedWalls = observedWallsPrefixSum[currentStep]
  setObservedWalls(x, y, direction, observedWalls, height, width)
}

const leftWallExists = ({
  state: {
    processedHistory: { positions, observedWallsPrefixSum },
    currentStep,
    width,
    height,
  },
}: CommandProcessorInput) => {
  let { x, y, direction } = positions[currentStep]
  let observedWalls = observedWallsPrefixSum[currentStep]
  const sensorDirection = mod(direction + 1, 4)
  setObservedWalls(x, y, sensorDirection, observedWalls, height, width)
}

const rightWallExists = ({
  state: {
    processedHistory: { positions, observedWallsPrefixSum },
    currentStep,
    width,
    height,
  },
}: CommandProcessorInput) => {
  let { x, y, direction } = positions[currentStep]
  let observedWalls = observedWallsPrefixSum[currentStep]
  const sensorDirection = mod(direction - 1, 4)
  setObservedWalls(x, y, sensorDirection, observedWalls, height, width)
}

function setObservedWalls(
  x: number,
  y: number,
  direction: MouseDirection,
  observedWalls: ObservedWalls[][],
  height: number,
  width: number
) {
  if (direction === MouseDirection.UP && y + 1 < height) {
    observedWalls[y + 1][x].bottom = true
  } else if (direction === MouseDirection.LEFT) {
    observedWalls[y][x].left = true
  } else if (direction === MouseDirection.DOWN) {
    observedWalls[y][x].bottom = true
  } else if (direction === MouseDirection.RIGHT && x + 1 < width) {
    observedWalls[y][x + 1].left = true
  }
}

// Control
const turnLeft = ({
  state: {
    processedHistory: { positions },
    currentStep,
  },
}: CommandProcessorInput) => {
  positions[currentStep].direction = mod(positions[currentStep].direction + 1, 4)
}

const turnRight = ({
  state: {
    processedHistory: { positions },
    currentStep,
  },
}: CommandProcessorInput) => {
  positions[currentStep].direction = mod(positions[currentStep].direction - 1, 4)
}

const moveForward = ({ state, command }: CommandProcessorInput) => {
  const {
    processedHistory: {
      positions,
      cellVisitesPrefixSum,
      observedWallsPrefixSum,
      consoleLogs,
      cellLabelsHistory,
    },
    width,
    height,
    currentStep,
  } = state
  let numberOfSteps = 1
  if (command.split(' ').length > 1) {
    numberOfSteps = parseInt(command.split(' ')[1])
  }

  for (let i = 0; i < numberOfSteps; i++) {
    // add new position
    const { direction: dir, x, y } = positions[currentStep]
    const newPosition: MousePosition = {
      x: dir % 2 === 1 ? x + dir - 2 : x,
      y: dir % 2 === 0 ? y - dir + 1 : y,
      direction: dir,
    }
    positions.push(newPosition)
    // add new cell visites array
    const newCellVisites = _.cloneDeep(cellVisitesPrefixSum[currentStep])
    newCellVisites[newPosition.y][newPosition.x] += 1
    cellVisitesPrefixSum.push(newCellVisites)
    // add new observed walls array
    const newObservedWalls = _.cloneDeep(observedWallsPrefixSum[currentStep])
    observedWallsPrefixSum.push(newObservedWalls)
    // add new cell labels array
    const cellLabelsInitial = [...Array(height)].map((e) => Array(width).fill(''))
    cellLabelsHistory.push(cellLabelsInitial)
    // add new console log
    consoleLogs.push({
      step: currentStep + 1,
      text: '',
    })
    state.currentStep += 1
  }
}

// Feedback
const consoleLog = ({
  state: {
    processedHistory: { consoleLogs },
    currentStep,
  },
  command,
}: CommandProcessorInput) => {
  let message = ' '
  if (command.split(' ').length > 1) {
    message = command.substring(3) + '\n'
  }
  consoleLogs[currentStep].text += message
}

const setText = ({
  state: {
    processedHistory: { cellLabelsHistory },
    currentStep,
  },
  command,
}: CommandProcessorInput) => {
  const parsedCmd = command.split(' ')
  const x = parseInt(parsedCmd[1])
  const y = parseInt(parsedCmd[2])
  const text = parsedCmd[3]
  cellLabelsHistory[currentStep][y][x] = text
}

const wrongSyntax = ({ command }: CommandProcessorInput) => {
  console.error('Unrecognized syntax used: ' + command)
}

export const commandProcessors: CommandProcessor[] = [
  { syntax: /^fw$/, process: frontWallExists },
  { syntax: /^lw$/, process: leftWallExists },
  { syntax: /^rw$/, process: rightWallExists },
  { syntax: /^mf [0-9]{1,2}$|^mf$/, process: moveForward },
  { syntax: /^tl$/, process: turnLeft },
  { syntax: /^tr$/, process: turnRight },
  { syntax: /^cl /, process: consoleLog },
  { syntax: /^st [0-9]{1,2} [0-9]{1,2} .{1,4}$/, process: setText },
  { syntax: /.*/, process: wrongSyntax },
]
