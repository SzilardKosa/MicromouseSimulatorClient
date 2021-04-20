import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/store'

export type EditType = 'insertWall' | 'deleteWall' | 'editGoal'

export interface CellWalls {
  bottom: boolean
  left: boolean
}

export interface Cell {
  x: number
  y: number
}

interface MazeEditorState {
  editType: EditType
  cellSize: number
  cellWallRation: number
  rows: number
  cols: number
  walls: CellWalls[][]
  goalArea: Cell[]
}

const initialState: MazeEditorState = {
  editType: 'insertWall',
  cellSize: 50,
  cellWallRation: 0.25,
  rows: 10,
  cols: 12,
  walls: [...Array(10)].map((e) => Array(12).fill({ bottom: false, left: false })),
  goalArea: [
    {
      x: 4,
      y: 4,
    },
    {
      x: 6,
      y: 5,
    },
  ],
}

const mazeEditorSlice = createSlice({
  name: 'mazeEditor',
  initialState,
  reducers: {
    changeEditType: (state, action: PayloadAction<EditType>) => {
      state.editType = action.payload
    },
    setCellSize: (state, action: PayloadAction<number>) => {
      state.cellSize = action.payload
    },
    setCellWallRation: (state, action: PayloadAction<number>) => {
      state.cellWallRation = action.payload
    },
    setRows: (state, action: PayloadAction<number>) => {
      const newRows = action.payload
      if (newRows < 1 || 32 < newRows) return
      state.rows = newRows
      state.walls = [...Array(newRows)].map((e) =>
        Array(state.cols).fill({ bottom: false, left: false })
      )
    },
    setCols: (state, action: PayloadAction<number>) => {
      const newCols = action.payload
      if (newCols < 1 || 32 < newCols) return
      state.cols = newCols
      state.walls = [...Array(state.rows)].map((e) =>
        Array(newCols).fill({ bottom: false, left: false })
      )
    },
    setBottomWall: (state, action: PayloadAction<{ r: number; c: number; newState: boolean }>) => {
      state.walls[action.payload.r][action.payload.c].bottom = action.payload.newState
    },
    setLeftWall: (state, action: PayloadAction<{ r: number; c: number; newState: boolean }>) => {
      state.walls[action.payload.r][action.payload.c].left = action.payload.newState
    },
    setGoalArea: (state, action: PayloadAction<Cell[]>) => {
      state.goalArea = action.payload
    },
  },
})

export default mazeEditorSlice.reducer

export const {
  changeEditType,
  setCellSize,
  setCellWallRation,
  setRows,
  setCols,
  setBottomWall,
  setLeftWall,
  setGoalArea,
} = mazeEditorSlice.actions

export const selectEditType = (state: RootState) => state.mazeEditor.editType
export const selectCellSize = (state: RootState) => state.mazeEditor.cellSize
export const selectCellWallRation = (state: RootState) => state.mazeEditor.cellWallRation
export const selectRows = (state: RootState) => state.mazeEditor.rows
export const selectCols = (state: RootState) => state.mazeEditor.cols
export const selectWalls = (state: RootState) => state.mazeEditor.walls
export const selectGoalArea = (state: RootState) => state.mazeEditor.goalArea
