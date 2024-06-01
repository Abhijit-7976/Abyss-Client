import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const wsSlice = createSlice({
  name: "ws",
  initialState: {
    mediasoupSocket: io("/mediasoup", { path: "/ws" }),
    chatSocket: io("/chats", { path: "/ws" }),
  },
  reducers: {},
});

export default wsSlice.reducer;
