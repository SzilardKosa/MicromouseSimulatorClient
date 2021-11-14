import { MazeDTO } from './../../../../api/gen/api'

export const defaultHeight = 16
export const defaultWidth = 16

export const defaultWalls = [...Array(defaultHeight)].map((e) =>
  Array(defaultWidth).fill({ bottom: false, left: false })
)

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
