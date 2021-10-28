import { MazeDTO, SimulationResultDTO } from './../../../api/gen/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store'

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
  cellVisits: number[][]
  cellLabels: string[][]
}

interface ResultState {
  errorMessage?: string
  mazeViewerInput?: MazeViewerInput
  // helper data
  steps: MousePosition[]
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
  steps: [],
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
      if (state.mazeViewerInput)
        state.mazeViewerInput.currentPosition = state.steps[state.selectedInterval[1]]
    },
    simulationFinished: (state, action: PayloadAction<SimulationResultDTO>) => {
      state.errorMessage = action.payload.error
      const maze = action.payload.simulation.maze
      const width = maze?.width
      const height = maze?.height
      const steps: MousePosition[] = [
        {
          x: 0,
          y: 0,
          direction: MouseDirection.UP,
        },
      ]
      const history = action.payload.history

      // process history
      history.forEach((command) => {
        switch (true) {
          case /^tl$/.test(command):
            steps[steps.length - 1].direction += 1
            steps[steps.length - 1].direction = mod(steps[steps.length - 1].direction, 4)
            break
          case /^tr$/.test(command):
            steps[steps.length - 1].direction -= 1
            steps[steps.length - 1].direction = mod(steps[steps.length - 1].direction, 4)
            break
          case /^mf [0-9]{1,2}$|^mf$/.test(command): {
            let numberOfSteps = 1
            if (command.split(' ').length > 1) {
              numberOfSteps = parseInt(command.split(' ')[1])
            }
            for (let i = 0; i < numberOfSteps; i++) {
              const dir = steps[steps.length - 1].direction
              const x = steps[steps.length - 1].x
              const y = steps[steps.length - 1].y
              const newStep: MousePosition = {
                x: dir % 2 === 1 ? x + dir - 2 : x,
                y: dir % 2 === 0 ? y - dir + 1 : y,
                direction: dir,
              }
              steps.push(newStep)
            }
            break
          }
          default:
            break
        }
      })

      // set current state
      state.steps = steps
      state.selectedInterval = [0, steps.length - 1]
      state.intervalLength = steps.length - 1
      state.mazeViewerInput = {
        mazeSnapshot: maze!,
        currentPosition: steps[steps.length - 1],
        observedWalls: [...Array(height)].map((e) =>
          Array(width).fill({ bottom: false, left: false })
        ),
        cellVisits: [...Array(height)].map((e) => Array(width).fill(0)),
        cellLabels: [...Array(height)].map((e) => Array(width).fill('')),
      }
    },
  },
})

// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export default resultSlice.reducer

export const { setCellSize, setCellWallRation, setSelectedInterval, simulationFinished } =
  resultSlice.actions

export const selectCellSize = (state: RootState) => state.result.cellSize
export const selectCellWallRation = (state: RootState) => state.result.cellWallRation
export const selectSelectedInterval = (state: RootState) => state.result.selectedInterval
export const selectIntervalLength = (state: RootState) => state.result.intervalLength
export const selectMazeViewerInput = (state: RootState) => state.result.mazeViewerInput
