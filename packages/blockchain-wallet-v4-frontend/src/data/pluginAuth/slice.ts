import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const pluginAuthSlice = createSlice({
  initialState,
  name: 'pluginAuth',
  reducers: {
    autoLogin: () => {},
    loginRoutineSaga: () => {}
  }
})

const { actions } = pluginAuthSlice
const pluginAuthReducer = pluginAuthSlice.reducer
export { actions, pluginAuthReducer }
