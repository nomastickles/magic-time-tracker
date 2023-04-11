import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useColorScheme } from "@mui/material/styles";
import React from "react";
import "./App.css";
import { ClockOfTimestamp as Clock } from "./TimeComponents/ClockOfTimestamp";
import { TimeSinceTimestamp } from "./TimeComponents/TimeSinceTimestamp";
import Modal from "./TimeComponents/ModalTimePicker";
import * as actions from "./actions";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppState } from "./hooks/useAppState";
import { useIsDemoMode } from "./hooks/useIsDemoMode";
import Buttons from "./Buttons";

const CURRENT_DATA_FETCH_INTERVAL = 5000 * 2;

function App() {
  const { isDemo } = useIsDemoMode();
  const { appData, appStep } = useAppState();
  const dispatch = useAppDispatch();
  const { setMode } = useColorScheme();
  const timestampMagic = appData["TIMESTAMP_MAGIC"];
  const isNightTime = !!appStep["SLEEP"];
  const isSaving = !!appStep["SAVING"];
  const fetchCurrentDataTrigger = appStep["FETCH_DATA_TRIGGER"];
  const key = `${appData["KEY"]}`;

  React.useEffect(() => {
    setMode("dark");
  }, [setMode]);

  const getCurrentInfo = React.useCallback(async () => {
    if (!key) {
      console.warn("getCurrentInfo: NO KEY FOUND");
      return;
    }
    if (!isSaving) {
      var url = new URL(`${window.location.origin}/current`);
      url.search = new URLSearchParams({
        key,
      }).toString();
      try {
        const response = await fetch(url.toString());
        const data = await response.json();
        dispatch(actions.setAppDataAll(data));
      } catch (e) {
        console.error(e);
      }
    }

    dispatch(
      actions.setAppStep({
        name: "FETCH_DATA_TRIGGER",
        value: Date.now(),
      })
    );
  }, [dispatch, isSaving, key]);

  React.useEffect(() => {
    if (isDemo) {
      return;
    }
    if (!fetchCurrentDataTrigger) {
      // start things going / only happens once
      dispatch(
        actions.setAppStep({
          name: "FETCH_DATA_TRIGGER",
          value: Date.now(),
        })
      );
      return;
    }

    setTimeout(() => {
      getCurrentInfo();
    }, CURRENT_DATA_FETCH_INTERVAL);
  }, [fetchCurrentDataTrigger, dispatch, getCurrentInfo, isDemo]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box>
        <Grid>
          <Grid
            item
            xs={12}
            className="animate__animated animate__fadeIn animate__slow"
          >
            <Clock
              title="Magic Time @"
              timestamp={timestampMagic}
              onClick={() => {
                dispatch(
                  actions.setAppStep({
                    name: "MODAL_OPEN_1",
                    value: Date.now(),
                  })
                );
              }}
            />
            <TimeSinceTimestamp
              timestamp={timestampMagic}
              isSaving={isSaving}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className="animate__animated animate__fadeIn animate__slow"
          >
            <Buttons />

            <Box sx={{ m: 4 }} />

            <Clock
              title={isNightTime ? "Sleep @" : "Wake @"}
              showSleepToggle
              isNightTime={isNightTime}
              timestamp={
                isNightTime
                  ? appData["TIMESTAMP_SLEEP"]
                  : appData["TIMESTAMP_WAKE"]
              }
              onClick={() => {
                dispatch(
                  actions.setAppStep({
                    name: "MODAL_OPEN_2",
                    value: Date.now(),
                  })
                );
              }}
            />

            <TimeSinceTimestamp
              timestamp={
                isNightTime
                  ? appData["TIMESTAMP_SLEEP"]
                  : appData["TIMESTAMP_WAKE"]
              }
              isSaving={false}
            />
          </Grid>
        </Grid>
      </Box>

      <Modal modalStepName="MODAL_OPEN_1" dataName="TIMESTAMP_MAGIC" />
      <Modal
        modalStepName="MODAL_OPEN_2"
        dataName={isNightTime ? "TIMESTAMP_SLEEP" : "TIMESTAMP_WAKE"}
      />
    </Box>
  );
}

export default App;
