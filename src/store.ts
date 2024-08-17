import newMessagesReducer from "@/features/chats/newMessagesSlice";
import selectedGroupUsersReducer from "@/features/chats/selectedGroupUsersSlice";
import userGeneralSettingsReducer from "@/features/settings/userGeneralSettings";
import wsReducer from "@/features/webSocket/wsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: {
    generalSettings: userGeneralSettingsReducer,
    ws: wsReducer,
    newMessages: newMessagesReducer,
    selectedGroupUsers: selectedGroupUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
