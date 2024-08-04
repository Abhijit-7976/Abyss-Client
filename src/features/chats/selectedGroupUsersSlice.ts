import { User } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const selectedGroupUsersSlice = createSlice({
  name: "selectedGroupUsers",
  initialState: Array<User>(),
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    removeUser: (state, action) => {
      return state.filter(user => user._id !== action.payload);
    },
    clearUsers: () => [],

    toggleUser: (state, action) => {
      const newState = state.filter(user => user._id !== action.payload._id);

      if (newState.length === state.length) {
        newState.push(action.payload);
      }

      return newState;
    },
  },
});

export const { addUser, removeUser, clearUsers, toggleUser } =
  selectedGroupUsersSlice.actions;

export default selectedGroupUsersSlice.reducer;
