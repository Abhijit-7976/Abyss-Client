import LocalStorageUtil from "@/utility/localStorage";
import { createSlice } from "@reduxjs/toolkit";

type themeType = "system" | "light" | "dark";
type generalSettingsState = {
  theme: themeType;
  media: {
    allCameras: Array<MediaDeviceInfo>;
    allMics: Array<MediaDeviceInfo>;
    camera: string;
    mic: string;
  };
};

const userGeneralSettings = createSlice({
  name: "generalSettings",
  initialState: () => {
    let generalSettings: generalSettingsState;

    const localSettings = localStorage.getItem("generalSettings");
    if (localSettings) generalSettings = JSON.parse(localSettings);
    else {
      generalSettings = {
        theme: "system",
        media: { allCameras: [], allMics: [], camera: "", mic: "" },
      };
      localStorage.setItem("generalSettings", JSON.stringify(generalSettings));
    }

    const theme: themeType = (generalSettings.theme as themeType) || "system";

    // theme
    let isDarkMode = false;
    switch (theme) {
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

    return generalSettings;
  },
  reducers: {
    updateTheme: (state, action) => {
      let isDarkMode = false;
      switch (action.payload) {
        case "system": {
          state.theme = "system";
          isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          break;
        }
        case "light": {
          state.theme = "light";
          isDarkMode = false;
          break;
        }
        case "dark": {
          state.theme = "dark";
          isDarkMode = true;
          break;
        }
      }

      isDarkMode
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");

      LocalStorageUtil.save("generalSettings", state);
    },
    updateCamera: (state, action) => {
      state.media.camera = action.payload;
      LocalStorageUtil.save("generalSettings", state);
    },
    updateMic: (state, action) => {
      state.media.mic = action.payload;
      LocalStorageUtil.save("generalSettings", state);
    },
    updateAllCameras: (state, action) => {
      state.media.allCameras = action.payload;
      LocalStorageUtil.save("generalSettings", state);
    },
    updateAllMics: (state, action) => {
      state.media.allMics = action.payload;
      LocalStorageUtil.save("generalSettings", state);
    },
  },
});

export const {
  updateTheme,
  updateCamera,
  updateMic,
  updateAllCameras,
  updateAllMics,
} = userGeneralSettings.actions;

export default userGeneralSettings.reducer;
