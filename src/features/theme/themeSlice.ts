import { AppDispatch, RootState } from "@/store";
import { ListenerEffectAPI, createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: () => {
    const localDark = localStorage.getItem("darkMode");

    const isDarkMode = localDark
      ? (JSON.parse(localDark) as boolean)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    return { isDarkMode };
  },
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const toggleDarkModeEffect = (
  _: ReturnType<typeof toggleDarkMode>,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  const isDarkMode = listenerApi.getState().theme.isDarkMode;
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

  isDarkMode
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
};

export default themeSlice.reducer;
