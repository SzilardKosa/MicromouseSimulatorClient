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
  },
})

export default mazeEditorSlice.reducer

export const { changeEditType } = mazeEditorSlice.actions

export const selectEditType = (state: RootState) => state.mazeEditor.editType
