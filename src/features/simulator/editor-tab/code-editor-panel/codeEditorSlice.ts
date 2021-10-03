import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../../app/store'

interface CodeEditorState {
  fontSize: number
}

const initialState: CodeEditorState = {
  fontSize: 14,
}

const codeEditorSlice = createSlice({
  name: 'codeEditor',
  initialState,
  reducers: {
    updateFontSize(state, action) {
      const newFontSize = parseInt(action.payload)
      state.fontSize = newFontSize
    },
  },
})

export default codeEditorSlice.reducer

export const { updateFontSize } = codeEditorSlice.actions

export const selectFontSize = (state: RootState) => state.codeEditor.fontSize
