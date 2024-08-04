import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import newMessagesReducer from "./features/chats/newMessagesSlice";
import selectedGroupUsersReducer from "./features/chats/selectedGroupUsersSlice";
import themeReducer from "./features/theme/themeSlice";
import wsReducer from "./features/webSocket/wsSlice";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";

enableMapSet();

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ws: wsReducer,
    newMessages: newMessagesReducer,
    selectedGroupUsers: selectedGroupUsersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(
      listenerMiddleware.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
