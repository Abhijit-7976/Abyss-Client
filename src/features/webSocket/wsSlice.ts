import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const wsSlice = createSlice({
  name: "ws",
  initialState: {
    mediasoupSocket: io("http://localhost:8000/mediasoup", { path: "/ws" }),
    chatSocket: io("http://localhost:8000/chats", { path: "/ws" }),
  },
  reducers: {},
});

export default wsSlice.reducer;
