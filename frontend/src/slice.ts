import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { AppState } from "./types";

const isInitSleep = () => {
  if (!window.APP_DATA_INIT?.TIMESTAMP_SLEEP) {
    return false;
  }

  if (!window.APP_DATA_INIT?.TIMESTAMP_WAKE) {
    return true;
  }

  return (
    window.APP_DATA_INIT.TIMESTAMP_SLEEP > window.APP_DATA_INIT.TIMESTAMP_WAKE
  );
};

export const initialState: AppState = {
  appData: window.APP_DATA_INIT || {},
  appStep: {
    SLEEP: isInitSleep() ? 1 : 0,
  },
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.setAppData, (state, { payload }) => {
      if (payload.clear) {
        state.appData[payload.name] = undefined;
        return;
      }
      const newValue = payload.value;
      state.appData[payload.name] = newValue;
    });
    builder.addCase(actions.setAppStep, (state, { payload }) => {
      if (payload.clear) {
        state.appStep[payload.name] = undefined;
        return;
      }
      const newValue = payload.value;
      state.appStep[payload.name] = newValue;
    });

    builder.addCase(actions.reset, (state) => {
      state.appData = {};
    });
    builder.addCase(actions.setAppDataAll, (state, { payload }) => {
      state.appData = { ...payload };
    });
  },
});
