import { MazeDTO, SimulationResultDTO } from './../../../api/gen/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store'
import _ from 'lodash'

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

interface ProcessedHistory {
  positions: MousePosition[]
  cellVisitesPrefixSum: number[][][] // w*h*intSize*steps= 32 * 32 * 4 byte * 10000 = 41MB
  observedWallsPrefixSum: ObservedWalls[][][] // ~ max 41MB
}

interface ResultState {
  errorMessage?: string
  mazeViewerInput?: MazeViewerInput
  processedHistory?: ProcessedHistory
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
    setSelectedInterval: (state, action: PayloadAction<number[]>) => {
      state.selectedInterval = action.payload
      const { mazeViewerInput, processedHistory } = state
      if (mazeViewerInput && processedHistory) {
        mazeViewerInput.currentPosition = processedHistory.positions[state.selectedInterval[1]]
        mazeViewerInput.cellVisites =
          state.selectedInterval[0] === 0
            ? processedHistory.cellVisitesPrefixSum[state.selectedInterval[1]]
            : subtract(
                processedHistory.cellVisitesPrefixSum[state.selectedInterval[1]],
                processedHistory.cellVisitesPrefixSum[state.selectedInterval[0] - 1]
              )
      }
    },
    simulationFinished: (state, action: PayloadAction<SimulationResultDTO>) => {
      state.errorMessage = action.payload.error
      const maze = action.payload.simulation.maze
      const width = maze?.width
      const height = maze?.height
      const history = action.payload.history
      const cellVisitesInitial = [...Array(height)].map((e) => Array(width).fill(0))
      cellVisitesInitial[0][0] = 1
      const processedHistory: ProcessedHistory = {
        positions: [
          {
            x: 0,
            y: 0,
            direction: MouseDirection.UP,
          },
        ],
        cellVisitesPrefixSum: [cellVisitesInitial],
        observedWallsPrefixSum: [],
      }

      // process history
      history.forEach((command) => {
        switch (true) {
          case /^tl$/.test(command): {
            let positions = processedHistory.positions
            positions[positions.length - 1].direction += 1
            positions[positions.length - 1].direction = mod(
              positions[positions.length - 1].direction,
              4
            )
            break
          }
          case /^tr$/.test(command): {
            let positions = processedHistory.positions
            positions[positions.length - 1].direction -= 1
            positions[positions.length - 1].direction = mod(
              positions[positions.length - 1].direction,
              4
            )
            break
          }
          case /^mf [0-9]{1,2}$|^mf$/.test(command): {
            let numberOfSteps = 1
            if (command.split(' ').length > 1) {
              numberOfSteps = parseInt(command.split(' ')[1])
            }

            let positions = processedHistory.positions
            let cellVisitesPrefixSum = processedHistory.cellVisitesPrefixSum
            for (let i = 0; i < numberOfSteps; i++) {
              // add new position
              const dir = positions[positions.length - 1].direction
              const x = positions[positions.length - 1].x
              const y = positions[positions.length - 1].y
              const newPosition: MousePosition = {
                x: dir % 2 === 1 ? x + dir - 2 : x,
                y: dir % 2 === 0 ? y - dir + 1 : y,
                direction: dir,
              }
              positions.push(newPosition)
              // add new cell visites array
              const newCellVisites = _.cloneDeep(
                cellVisitesPrefixSum[cellVisitesPrefixSum.length - 1]
              )
              newCellVisites[newPosition.y][newPosition.x] += 1
              cellVisitesPrefixSum.push(newCellVisites)
            }
            break
          }
          default:
            break
        }
      })

      // set current state
      state.processedHistory = processedHistory
      const positions = processedHistory.positions
      const cellVisitesPrefixSum = processedHistory.cellVisitesPrefixSum
      state.selectedInterval = [0, positions.length - 1]
      state.intervalLength = positions.length - 1
      state.mazeViewerInput = {
        mazeSnapshot: maze!,
        currentPosition: positions[positions.length - 1],
        observedWalls: [...Array(height)].map((e) =>
          Array(width).fill({ bottom: false, left: false })
        ),
        cellVisites: cellVisitesPrefixSum[cellVisitesPrefixSum.length - 1],
        cellLabels: [...Array(height)].map((e) => Array(width).fill('')),
      }
    },
  },
})

// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

function subtract(a: number[][], b: number[][]): number[][] {
  return componentWiseOperation<number>((x, y) => x - y, a, b)
}

function componentWiseOperation<T>(o: (aE: T, bE: T) => T, a: T[][], b: T[][]): T[][] {
  const result = a.map((row, i) => row.map((element, j) => o(element, b[i][j])))
  return result
}

export default resultSlice.reducer

export const { setCellSize, setCellWallRation, setSelectedInterval, simulationFinished } =
  resultSlice.actions

export const selectCellSize = (state: RootState) => state.result.cellSize
export const selectCellWallRation = (state: RootState) => state.result.cellWallRation
export const selectSelectedInterval = (state: RootState) => state.result.selectedInterval
export const selectIntervalLength = (state: RootState) => state.result.intervalLength
export const selectMazeViewerInput = (state: RootState) => state.result.mazeViewerInput
