import { AppDispatch, RootState } from "@/store";
import { ListenerEffectAPI, createSlice } from "@reduxjs/toolkit";

type themeType = "system" | "light" | "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: () => {
    const themeValue: themeType =
      (localStorage.getItem("theme") as themeType) || "system";

    let isDarkMode = false;
    switch (themeValue) {
      case "system": {
        isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        break;
      }
      case "light": {
        isDarkMode = false;
        break;
      }
      case "dark": {
        isDarkMode = true;
        break;
      }
    }

    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    return { themeValue };
  },
  reducers: {
    // toggleDarkMode: state => {
    //   state.isDarkMode = !state.isDarkMode;
    // },
    changeTheme: (state, action) => {
      switch (action.payload) {
        case "system": {
          state.themeValue = "system";
          break;
        }
        case "light": {
          state.themeValue = "light";
          break;
        }
        case "dark": {
          state.themeValue = "dark";
          break;
        }
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;

// export const toggleDarkModeEffect = (
//   _: ReturnType<typeof toggleDarkMode>,
//   listenerApi: ListenerEffectAPI<RootState, AppDispatch>
// ) => {
//   const isDarkMode = listenerApi.getState().theme.isDarkMode;
//   localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

//   isDarkMode
//     ? document.documentElement.classList.add("dark")
//     : document.documentElement.classList.remove("dark");
// };

export const changeThemeEffect = (
  _: ReturnType<typeof changeTheme>,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  const themeValue = listenerApi.getState().theme.themeValue;
  localStorage.setItem("theme", themeValue);

  let isDarkMode = false;
  switch (themeValue) {
    case "system": {
      isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      break;
    }
    case "light": {
      isDarkMode = false;
      break;
    }
    case "dark": {
      isDarkMode = true;
      break;
    }
  }

  isDarkMode
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
};

export default themeSlice.reducer;
