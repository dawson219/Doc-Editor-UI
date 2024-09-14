import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/UserSlice'
import documentSlice from './Slices/DocumentSlice';


const rootReducer = combineReducers({
  user: userSlice,
  document: documentSlice,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store;