import { estimateTime } from './timeEstimator'
import { processHistory } from './historyProcessor'
import { MazeDTO, MouseDTO, SimulationResultDTO } from './../../../api/gen/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store'
import { subtractMatrices } from './utils'
import { parseRoute } from './routeParser'

export enum MouseDirection {
  UP = 0,
  LEFT,
  DOWN,
  RIGHT,
}

export interface MousePosition {
  x: number
  y: number
  direction: MouseDirection
}

export interface ObservedWalls {
  bottom: boolean
  left: boolean
}

export interface MazeViewerInput {
  mazeSnapshot: MazeDTO
  currentPosition: MousePosition
  observedWalls: ObservedWalls[][]
  cellVisites: number[][]
  cellLabels: string[][]
}

export interface ConsoleLog {
  step: number
  text: string
}

export interface ProcessedHistory {
  positions: MousePosition[]
  cellVisitesPrefixSum: number[][][] // w*h*intSize*steps= 32 * 32 * 4 byte * 10000 = 41MB MAX
  observedWallsPrefixSum: ObservedWalls[][][] // (2 booleans = 4 bytes) ~ 20.5MB MAX
  cellLabelsHistory: string[][][] // (string with 4 char = 8 bytes) ~ 82MB MAX
  consoleLogs: ConsoleLog[]
}

export interface MazeRun {
  startIndex: number
  goalReachedIndex?: number
  endIndex: number
  // estimated times
  mazeRunTime?: number // from start to the goal area
  searchBackTime?: number // from the goal to the start
  fullRunTime?: number // from start to start
}

export interface ResultState {
  errorMessage?: string
  processedHistory?: ProcessedHistory
  mazeViewerInput?: MazeViewerInput
  consoleInput?: ConsoleLog[]
  mazeRuns?: MazeRun[]
  mouse?: MouseDTO
  // HUD
  cellSize: number
  cellWallRation: number
  selectedInterval: number[]
  intervalLength: number
}

const initialState: ResultState = {
  cellSize: 50,
  cellWallRation: 0.1,
  selectedInterval: [0, 0],
  intervalLength: 0,
}

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setCellSize: (state, action: PayloadAction<number>) => {
      state.cellSize = action.payload
    },
    setCellWallRation: (state, action: PayloadAction<number>) => {
      state.cellWallRation = action.payload
    },
    setMouse: (state, action: PayloadAction<MouseDTO>) => {
      state.mouse = action.payload
      if (state.mazeViewerInput && state.processedHistory) {
        const {
          mazeViewerInput: { mazeSnapshot: maze },
          processedHistory: { positions },
        } = state
        estimateTime({ maze: maze, mouse: state.mouse, positions, state })
      }
    },
    setSelectedInterval: (state, action: PayloadAction<number[]>) => {
      state.selectedInterval = action.payload
      const [start, end] = action.payload
      const { mazeViewerInput, processedHistory } = state
      if (mazeViewerInput && processedHistory) {
        mazeViewerInput.currentPosition = processedHistory.positions[end]
        mazeViewerInput.observedWalls = processedHistory.observedWallsPrefixSum[end]
        mazeViewerInput.cellLabels = processedHistory.cellLabelsHistory[end]
        mazeViewerInput.cellVisites =
          start === 0
            ? processedHistory.cellVisitesPrefixSum[end]
            : subtractMatrices(
                processedHistory.cellVisitesPrefixSum[end],
                processedHistory.cellVisitesPrefixSum[start - 1]
              )
      }
      if (state.consoleInput && processedHistory) {
        state.consoleInput = processedHistory.consoleLogs.slice(start, end + 1)
      }
    },
    simulationFinished: (state, action: PayloadAction<SimulationResultDTO>) => {
      state.errorMessage = action.payload.error
      const {
        history,
        simulation: { maze },
      } = action.payload

      const {
        processedHistory: { positions },
      } = processHistory({ maze: maze!, history, state })

      parseRoute({ maze: maze!, positions, state })

      if (state.mouse) estimateTime({ maze: maze!, mouse: state.mouse, positions, state })
    },
  },
})

export default resultSlice.reducer

export const { setCellSize, setCellWallRation, setSelectedInterval, simulationFinished, setMouse } =
  resultSlice.actions

export const selectCellSize = (state: RootState) => state.result.cellSize
export const selectCellWallRation = (state: RootState) => state.result.cellWallRation
export const selectSelectedInterval = (state: RootState) => state.result.selectedInterval
export const selectIntervalLength = (state: RootState) => state.result.intervalLength
export const selectMazeViewerInput = (state: RootState) => state.result.mazeViewerInput
export const selectConsoleInput = (state: RootState) => state.result.consoleInput
export const selectMazeRuns = (state: RootState) => state.result.mazeRuns
export const selectErrorMessage = (state: RootState) => state.result.errorMessage
export const selectMouse = (state: RootState) => state.result.mouse
