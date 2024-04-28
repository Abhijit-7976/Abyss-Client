import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import wsReducers from "./features/webSocket/wsSlice";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";

export const store = configureStore({
  reducer: { theme: themeReducer, ws: wsReducers },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
