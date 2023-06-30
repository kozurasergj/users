import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './slices/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
})

export type DispathType = typeof store.dispatch
export type RootStateType = ReturnType<typeof store.getState>
