import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import simulatorReducer from '../features/simulator/simulatorSlice'

export const store = configureStore({
  reducer: {
    simulator: simulatorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
