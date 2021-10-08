import { MazeDTO } from './../../../../api/gen/api'

export const defaultWalls = [...Array(10)].map((e) =>
  Array(12).fill({ bottom: false, left: false })
)
export const defaultHeight = 10
export const defaultWidth = 12

export const getMazeDeepCopy = (maze: MazeDTO) => {
  const newMaze: MazeDTO = {
    ...maze,
    goalArea: {
      cell1: {
        ...maze.goalArea.cell1,
      },
      cell2: {
        ...maze.goalArea.cell2,
      },
    },
  }
  return newMaze
}
