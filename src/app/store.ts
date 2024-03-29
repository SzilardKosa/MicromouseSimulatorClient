import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import simulatorReducer from '../features/simulator/simulatorSlice'
import authReducer from '../features/auth/authSlice'
import resultReducer from '../features/simulator/result-tab/resultSlice'
import mazeEditorReducer from '../features/simulator/editor-tab/maze-editor-panel/mazeEditorSlice'
import codeEditorReducer from '../features/simulator/editor-tab/code-editor-panel/codeEditorSlice'

export const store = configureStore({
  reducer: {
    simulator: simulatorReducer,
    auth: authReducer,
    result: resultReducer,
    mazeEditor: mazeEditorReducer,
    codeEditor: codeEditorReducer,
  },
  middleware: [],
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
