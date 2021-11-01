import { MazeDTO, Coordinate } from '../../../api/gen'
import { MazeRun, MousePosition, ResultState } from './resultSlice'

interface RouteParserInput {
  maze: MazeDTO
  positions: MousePosition[]
  state: ResultState
}

const checkIfAreaEntered = (
  bottomLeft: Coordinate,
  topRight: Coordinate,
  currentPos: Coordinate
) => {
  if (
    bottomLeft.x <= currentPos.x &&
    currentPos.x <= topRight.x &&
    bottomLeft.y <= currentPos.y &&
    currentPos.y <= topRight.y
  )
    return true
  return false
}

export const parseRoute = ({ maze, positions, state }: RouteParserInput) => {
  const mazeRuns: MazeRun[] = [{ startIndex: 0, endIndex: 0 }]
  let currentRun = 0
  let goalReached = false
  const lastIndex = positions.length - 1
  const goalBottomLeft: Coordinate = {
    x: Math.min(maze.goalArea.cell1.x, maze.goalArea.cell2.x),
    y: Math.min(maze.goalArea.cell1.y, maze.goalArea.cell2.y),
  }
  const goalTopRight: Coordinate = {
    x: Math.max(maze.goalArea.cell1.x, maze.goalArea.cell2.x),
    y: Math.max(maze.goalArea.cell1.y, maze.goalArea.cell2.y),
  }

  positions.forEach(({ x, y }, index) => {
    if (index === 0) return
    mazeRuns[currentRun].endIndex = index
    if (x === 0 && y === 0 && index !== lastIndex) {
      const newMazeRun: MazeRun = { startIndex: index, endIndex: index }
      mazeRuns.push(newMazeRun)
      goalReached = false
      currentRun += 1
    } else if (checkIfAreaEntered(goalBottomLeft, goalTopRight, { x, y }) && !goalReached) {
      mazeRuns[currentRun].goalReachedIndex = index
      goalReached = true
    }
  })

  state.mazeRuns = mazeRuns
}
