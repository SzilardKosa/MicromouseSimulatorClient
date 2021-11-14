import React, { useEffect, useRef } from 'react'
import { MazeViewerInput } from '../resultSlice'

const wallColor = 'rgb(200, 0, 0)'
const unobservedWallColor = 'rgb(70, 0, 0)'
const baseColor = 'rgb(0, 0, 0)'
const mouseColor = 'rgb(0, 122, 0)'
const wheelColor = 'rgb(125, 125, 125)'
const startColor = 'rgba(0, 122, 0, 0.6)'
const goalColor = 'rgba(0, 0, 255, 0.6)'
const visitedColor = 'rgb(0, 100, 250)'
const textColor = 'rgba(255, 255, 255, 0.9)'
const startCell = {
  x: 0,
  y: 0,
}

const MazeViewerCanvas = ({
  currentPosition,
  observedWalls,
  cellVisites,
  cellLabels,
  mazeSnapshot,
}: MazeViewerInput) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const cellSize = 500
  const cellWallRation = 0.1
  const wallWidth = Math.floor(cellSize * cellWallRation)
  const rows = mazeSnapshot.height
  const cols = mazeSnapshot.width
  const mazeWidth = cols * cellSize + wallWidth
  const mazeHeight = rows * cellSize + wallWidth

  const goalArea = [mazeSnapshot.goalArea.cell1, mazeSnapshot.goalArea.cell2]
  const walls = mazeSnapshot.walls

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas && canvas.width) canvas.width = mazeWidth
    if (canvas && canvas.height) canvas.height = mazeHeight
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
    fillCell(context, startCell.x, startCell.y, startColor)

    // draw goal area
    context.fillStyle = goalColor
    const bottomLeftX = Math.min(goalArea[0].x, goalArea[1].x)
    const bottomLefty = Math.min(goalArea[0].y, goalArea[1].y)
    const goalWidth = Math.abs(goalArea[0].x - goalArea[1].x) + 1
    const goalHeight = Math.abs(goalArea[0].y - goalArea[1].y) + 1
    context.fillRect(
      bottomLeftX * cellSize + wallWidth / 2,
      bottomLefty * cellSize + wallWidth / 2,
      goalWidth * cellSize,
      goalHeight * cellSize
    )

    // draw route
    cellVisites.forEach((row, r) => {
      row.forEach((numberOfVisites, c) => {
        context.globalAlpha = Math.min(0.3 * numberOfVisites, 1)
        fillCell(context, c, r, visitedColor)
      })
    })
    context.globalAlpha = 1

    // draw posts (rows+1)x(cols+1)
    context.fillStyle = wallColor
    for (let r = 0; r < rows + 1; r++) {
      for (let c = 0; c < cols + 1; c++) {
        // draw post
        context.fillRect(c * cellSize, r * cellSize, wallWidth, wallWidth)
      }
    }

    // draw inner walls
    walls.forEach((row, r) => {
      row.forEach((cell, c) => {
        const isObserved = observedWalls[r][c]
        if (cell.bottom) {
          context.fillStyle = isObserved.bottom ? wallColor : unobservedWallColor
          context.fillRect(c * cellSize + wallWidth, r * cellSize, cellSize - wallWidth, wallWidth)
        }
        if (cell.left) {
          context.fillStyle = isObserved.left ? wallColor : unobservedWallColor
          context.fillRect(c * cellSize, r * cellSize + wallWidth, wallWidth, cellSize - wallWidth)
        }
      })
    })

    // draw outter walls
    context.fillStyle = wallColor
    for (let c = 0; c < cols; c++) {
      context.fillRect(c * cellSize + wallWidth, 0, cellSize - wallWidth, wallWidth)
      context.fillRect(c * cellSize + wallWidth, rows * cellSize, cellSize - wallWidth, wallWidth)
    }
    for (let r = 0; r < rows; r++) {
      context.fillRect(0, r * cellSize + wallWidth, wallWidth, cellSize - wallWidth)
      context.fillRect(cols * cellSize, r * cellSize + wallWidth, wallWidth, cellSize - wallWidth)
    }

    // draw mouse
    context.save()
    context.translate(
      currentPosition.x * cellSize + wallWidth / 2 + cellSize / 2,
      currentPosition.y * cellSize + wallWidth / 2 + cellSize / 2
    )
    context.rotate((Math.PI / 2) * currentPosition.direction)
    context.fillStyle = mouseColor
    // body
    context.fillRect((cellSize * -1) / 8, cellSize / -4, cellSize / 4, (cellSize * 3) / 8)
    // front
    context.beginPath()
    context.arc(0, (cellSize * 1) / 8, cellSize / 4, 0, Math.PI)
    context.fill()
    // wheels
    context.fillStyle = wheelColor
    context.fillRect((cellSize * -1.75) / 8, cellSize / -4, cellSize / 16, (cellSize * 1.25) / 8)
    context.fillRect(
      (cellSize * -1.75) / 8,
      (cellSize * -0.5) / 8,
      cellSize / 16,
      (cellSize * 1.25) / 8
    )
    context.fillRect((cellSize * 1.25) / 8, cellSize / -4, cellSize / 16, (cellSize * 1.25) / 8)
    context.fillRect(
      (cellSize * 1.25) / 8,
      (cellSize * -0.5) / 8,
      cellSize / 16,
      (cellSize * 1.25) / 8
    )
    context.restore()

    // draw labels
    context.save()
    context.translate(0, mazeHeight)
    context.scale(1, -1)
    context.fillStyle = textColor
    context.font = `${Math.ceil((cellSize * 1) / 3)}px sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    cellLabels.forEach((row, r) => {
      row.forEach((text, c) => {
        context.fillText(
          text,
          c * cellSize + (cellSize + wallWidth) / 2,
          mazeHeight - (r * cellSize + (cellSize + wallWidth) / 2)
        )
      })
    })
    context.restore()

    context.restore()
  }

  const fillCell = (context: CanvasRenderingContext2D, x: number, y: number, fillStyle: string) => {
    context.fillStyle = fillStyle
    context.fillRect(x * cellSize + wallWidth / 2, y * cellSize + wallWidth / 2, cellSize, cellSize)
  }

  return <canvas ref={canvasRef} />
}

export default MazeViewerCanvas
