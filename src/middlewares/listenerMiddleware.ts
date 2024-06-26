import { changeTheme, changeThemeEffect } from "@/features/theme/themeSlice";
import { AppDispatch, RootState } from "@/store";
import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

// startAppListening({
//   actionCreator: toggleDarkMode,
//   effect: toggleDarkModeEffect,
// });
startAppListening({
  actionCreator: changeTheme,
  effect: changeThemeEffect,
});
