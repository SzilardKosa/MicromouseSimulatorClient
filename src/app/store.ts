import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import simulatorReducer from '../features/simulator/simulatorSlice'
import mazeEditorReducer from '../features/simulator/editor-tab/maze-editor-panel/mazeEditorSlice'
import codeEditorReducer from '../features/simulator/editor-tab/code-editor-panel/codeEditorSlice'

export const store = configureStore({
  reducer: {
    simulator: simulatorReducer,
    mazeEditor: mazeEditorReducer,
    codeEditor: codeEditorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
