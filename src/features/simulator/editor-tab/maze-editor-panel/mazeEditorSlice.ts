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
  walls: CellWalls[][]
  goalArea: Cell[]
}

const initialState: MazeEditorState = {
  editType: 'insertWall',
  cellSize: 40,
  cellWallRation: 0.25,
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
    setBottomWall: (state, action: PayloadAction<{ r: number; c: number; newState: boolean }>) => {
      state.walls[action.payload.r][action.payload.c].bottom = action.payload.newState
    },
    setLeftWall: (state, action: PayloadAction<{ r: number; c: number; newState: boolean }>) => {
      state.walls[action.payload.r][action.payload.c].left = action.payload.newState
    },
    setWalls: (state, action: PayloadAction<CellWalls[][]>) => {
      state.walls = action.payload
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
  setBottomWall,
  setLeftWall,
  setWalls,
  setGoalArea,
} = mazeEditorSlice.actions

export const selectEditType = (state: RootState) => state.mazeEditor.editType
export const selectCellSize = (state: RootState) => state.mazeEditor.cellSize
export const selectCellWallRation = (state: RootState) => state.mazeEditor.cellWallRation
export const selectWalls = (state: RootState) => state.mazeEditor.walls
export const selectGoalArea = (state: RootState) => state.mazeEditor.goalArea
