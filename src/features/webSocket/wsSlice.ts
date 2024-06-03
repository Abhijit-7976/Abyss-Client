import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const wsSlice = createSlice({
  name: "ws",
  initialState: {
    mediasoupSocket: io(`${import.meta.env.VITE_WS_BASE_URL}/mediasoup`),
    chatSocket: io(`${import.meta.env.VITE_WS_BASE_URL}/chats`),
  },
  reducers: {},
});

export default wsSlice.reducer;
