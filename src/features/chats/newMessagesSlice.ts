import { ChatMessage } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = new Map<string, ChatMessage[]>();

const newMessagesSlice = createSlice({
  name: "newMessages",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      const messages = state.get(action.payload.chatId);
      if (messages) {
        messages.push(action.payload.message);
      } else {
        state.set(action.payload.chatId, [action.payload.message]);
      }
    },
  },
});

export const { addNewMessage } = newMessagesSlice.actions;

export default newMessagesSlice.reducer;
