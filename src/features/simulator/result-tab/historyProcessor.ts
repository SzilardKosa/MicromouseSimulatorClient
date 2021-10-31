import { MazeDTO } from '../../../api/gen/api'
import { commandProcessors } from './commandProcessors'
import { MouseDirection, ProcessedHistory, ResultState } from './resultSlice'

export interface HistoryProcessorState {
  width: number
  height: number
  processedHistory: ProcessedHistory
  currentStep: number
}

const initHistoryProcessorState = (maze: MazeDTO): HistoryProcessorState => {
  const { width, height } = maze
  const cellVisitesInitial = [...Array(height)].map((e) => Array(width).fill(0))
  cellVisitesInitial[0][0] = 1
  const observedWallsInitial = [...Array(height)].map((e) =>
    Array.from({ length: width }, () => ({ bottom: false, left: false }))
  )
  return {
    width: width,
    height: height,
    currentStep: 0,
    processedHistory: {
      positions: [
        {
          x: 0,
          y: 0,
          direction: MouseDirection.UP,
        },
      ],
      cellVisitesPrefixSum: [cellVisitesInitial],
      observedWallsPrefixSum: [observedWallsInitial],
      consoleLogs: [
        {
          step: 0,
          text: '',
        },
      ],
    },
  }
}

const setStoreState = (
  historyProcessorState: HistoryProcessorState,
  state: ResultState,
  maze: MazeDTO
) => {
  const { currentStep, processedHistory, width, height } = historyProcessorState
  state.selectedInterval = [0, currentStep]
  state.intervalLength = currentStep
  state.processedHistory = processedHistory
  state.mazeViewerInput = {
    mazeSnapshot: maze,
    currentPosition: processedHistory.positions[currentStep],
    observedWalls: processedHistory.observedWallsPrefixSum[currentStep],
    cellVisites: processedHistory.cellVisitesPrefixSum[currentStep],
    cellLabels: [...Array(height)].map((e) => Array(width).fill('')),
  }
  state.consoleInput = processedHistory.consoleLogs
}

interface HistoryProcessorInput {
  maze: MazeDTO
  history: string[]
  state: ResultState
}

export const processHistory = ({ maze, history, state }: HistoryProcessorInput) => {
  const historyProcessorState = initHistoryProcessorState(maze)

  history.forEach((command) => {
    for (const commandProcessor of commandProcessors) {
      if (commandProcessor.syntax.test(command)) {
        commandProcessor.process({ state: historyProcessorState, command })
        break
      }
    }
  })

  setStoreState(historyProcessorState, state, maze)
}
