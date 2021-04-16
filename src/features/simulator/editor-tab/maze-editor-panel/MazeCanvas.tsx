import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectEditType } from './mazeEditorSlice'

const cellSize = 50 //[20 - 200] full cell size (half size - 9cm, full size - 18cm)
const cellWallRation = 0.25 //[0.1 - 0.5]
const wallWidth = Math.floor(cellSize * cellWallRation) // wall width (half size - .6cm, full size - 1.2cm)
const rows = 10 // y0 - ymax
const cols = 12 // x0 -xmax
const mazeWidth = cols * cellSize + wallWidth
const mazeHeight = rows * cellSize + wallWidth
const wallColor = 'rgb(122, 0, 0)'
const baseColor = 'rgb(0, 0, 0)'
const startCell = {
  x: 0,
  y: 0,
}

interface CellWalls {
  bottom: boolean
  left: boolean
}
interface Cell {
  x: number
  y: number
}
type editGoalStates = 'done' | 'active'

const MazeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [editGoalState, setEditGoalState] = useState<editGoalStates>('done')
  const editType = useSelector(selectEditType)

  const [walls, setWalls] = useState<CellWalls[][]>(
    [...Array(rows)].map((e) => Array(cols).fill({ bottom: false, left: false })) // https://stackoverflow.com/questions/16512182/how-to-create-empty-2d-array-in-javascript
  )
  const [goalArea, setGoalArea] = useState<Cell[]>([
    {
      x: 4,
      y: 4,
    },
    {
      x: 6,
      y: 5,
    },
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    drawMaze(context!)
  })

  const drawMaze = (context: CanvasRenderingContext2D) => {
    context.save()

    // transform canvas
    context.translate(0, mazeHeight)
    context.scale(1, -1)

    // clear canvas
    context.clearRect(0, 0, mazeWidth, mazeHeight)

    // draw base
    context.fillStyle = baseColor
    context.fillRect(0, 0, mazeWidth, mazeHeight)

    // draw start
    context.fillStyle = 'rgb(0, 122, 0)'
    context.fillRect(
      startCell.x * cellSize + wallWidth,
      startCell.y * cellSize + wallWidth,
      cellSize - wallWidth,
      cellSize - wallWidth
    )

    // draw goal area
    if (editGoalState === 'active') {
      context.fillStyle = 'rgb(0, 0, 122)'
    } else {
      context.fillStyle = 'rgb(0, 0, 255)'
    }
    const bottomLeftX = Math.min(goalArea[0].x, goalArea[1].x)
    const bottomLefty = Math.min(goalArea[0].y, goalArea[1].y)
    const goalWidth = Math.abs(goalArea[0].x - goalArea[1].x) + 1
    const goalHeight = Math.abs(goalArea[0].y - goalArea[1].y) + 1
    context.fillRect(
      bottomLeftX * cellSize + wallWidth,
      bottomLefty * cellSize + wallWidth,
      goalWidth * cellSize - wallWidth,
      goalHeight * cellSize - wallWidth
    )
    // draw first goal cell, if we are still editing the area
    if (editGoalState === 'active') {
      context.fillStyle = 'rgb(0, 0, 255)'
      context.fillRect(
        goalArea[0].x * cellSize + wallWidth,
        goalArea[0].y * cellSize + wallWidth,
        cellSize - wallWidth,
        cellSize - wallWidth
      )
    }

    // draw posts (rows+1)x(cols+1)
    context.fillStyle = wallColor
    for (let r = 0; r < rows + 1; r++) {
      for (let c = 0; c < cols + 1; c++) {
        // draw post
        context.fillRect(c * cellSize, r * cellSize, wallWidth, wallWidth)
      }
    }

    // draw outter walls
    for (let c = 0; c < cols; c++) {
      context.fillRect(c * cellSize + wallWidth, 0, cellSize - wallWidth, wallWidth)
      context.fillRect(c * cellSize + wallWidth, rows * cellSize, cellSize - wallWidth, wallWidth)
    }
    for (let r = 0; r < rows; r++) {
      context.fillRect(0, r * cellSize + wallWidth, wallWidth, cellSize - wallWidth)
      context.fillRect(cols * cellSize, r * cellSize + wallWidth, wallWidth, cellSize - wallWidth)
    }

    // draw inner walls
    walls.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.bottom) {
          context.fillRect(c * cellSize + wallWidth, r * cellSize, cellSize - wallWidth, wallWidth)
        }
        if (cell.left) {
          context.fillRect(c * cellSize, r * cellSize + wallWidth, wallWidth, cellSize - wallWidth)
        }
      })
    })

    context.restore()
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    setIsMouseDown(true)
    if (editType === 'insertWall' || editType == 'deleteWall') {
      editWalls(event, editType === 'insertWall')
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (editType === 'editGoal' && editGoalState === 'active') {
      editGoal(event)
    }
    if (!isMouseDown) {
      return
    }
    if (editType === 'insertWall' || editType == 'deleteWall') {
      editWalls(event, editType === 'insertWall')
    }
  }

  const handleMouseUP = (event: React.MouseEvent<HTMLElement>) => {
    setIsMouseDown(false)
    if (editType !== 'editGoal') {
      return
    }
    if (editGoalState === 'done') {
      startEditGoal(event)
    } else {
      endEditGoal(event)
    }
  }

  const editWalls = (event: React.MouseEvent<HTMLElement>, newState: boolean) => {
    const x = event.nativeEvent.offsetX
    const y = mazeHeight - event.nativeEvent.offsetY
    const rowIndex = Math.floor(y / cellSize)
    if (rowIndex < 0 || rows - 1 < rowIndex) {
      return
    }
    const colIndex = Math.floor(x / cellSize)
    if (colIndex < 0 || cols - 1 < colIndex) {
      return
    }
    const relX = x - colIndex * cellSize
    const relY = y - rowIndex * cellSize

    // Bottom wall
    if (wallWidth < relX && relY < wallWidth && walls[rowIndex][colIndex].bottom !== newState) {
      setWalls((walls) =>
        walls.map((row, r) =>
          row.map((cell, c) => {
            if (r === rowIndex && c === colIndex) {
              return { ...cell, bottom: newState }
            } else {
              return cell
            }
          })
        )
      )
    }

    // Left wall
    if (relX < wallWidth && wallWidth < relY && walls[rowIndex][colIndex].left !== newState) {
      setWalls((walls) =>
        walls.map((row, r) =>
          row.map((cell, c) => {
            if (r === rowIndex && c === colIndex) {
              return { ...cell, left: newState }
            } else {
              return cell
            }
          })
        )
      )
    }
  }

  const getCell = (event: React.MouseEvent<HTMLElement>): Cell => {
    const x = event.nativeEvent.offsetX - wallWidth / 2
    const y = mazeHeight - event.nativeEvent.offsetY - wallWidth / 2
    const rowIndex = Math.floor(y / cellSize)
    if (rowIndex < 0 || rows - 1 < rowIndex) {
      return { x: -1, y: -1 }
    }
    const colIndex = Math.floor(x / cellSize)
    if (colIndex < 0 || cols - 1 < colIndex) {
      return { x: -1, y: -1 }
    }
    if (colIndex === startCell.x && rowIndex === startCell.y) {
      return { x: -1, y: -1 }
    }
    return { x: colIndex, y: rowIndex }
  }

  const startEditGoal = (event: React.MouseEvent<HTMLElement>) => {
    const cell = getCell(event)
    if (cell.x === -1) return
    setGoalArea([cell, cell])
    setEditGoalState('active')
  }

  const endEditGoal = (event: React.MouseEvent<HTMLElement>) => {
    const cell = getCell(event)
    if (cell.x === -1) return
    setGoalArea([goalArea[0], cell])
    setEditGoalState('done')
  }

  const editGoal = (event: React.MouseEvent<HTMLElement>) => {
    const cell = getCell(event)
    if (cell.x === -1) return
    setGoalArea([goalArea[0], cell])
  }

  return (
    <canvas
      width={mazeWidth}
      height={mazeHeight}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUP}
      onMouseMove={handleMouseMove}
      ref={canvasRef}
    />
  )
}

export default MazeCanvas
