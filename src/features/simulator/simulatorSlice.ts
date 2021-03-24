import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export enum SimulatorTabs {
  Editor,
  Result,
}

interface SimulatorState {
  currentTab: SimulatorTabs
}

const initialState: SimulatorState = {
  currentTab: SimulatorTabs.Editor,
}

const simulatorSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<SimulatorTabs>) => {
      state.currentTab = action.payload
    },
  },
})

export default simulatorSlice.reducer

export const { changeTab } = simulatorSlice.actions

export const selectCurrentTab = (state: RootState) => state.simulator.currentTab
