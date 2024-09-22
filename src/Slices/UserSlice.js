import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  space: "ME",
  isLoading: false,
  message: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setSpace: (state, action) => {
      state.space = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setUser, setToken,setSpace, setIsLoading, setMessage } = userSlice.actions;

export default userSlice.reducer;
