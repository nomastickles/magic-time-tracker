import React from "react";
import { useAppDispatch } from "./useAppDispatch";
import * as actions from "../actions";
import { AppDataName } from "../types";
import { useAppState } from "./useAppState";
import { useIsDemoMode } from "./useIsDemoMode";

export const useUpdateDataToServer = () => {
  const dispatch = useAppDispatch();
  const { appData } = useAppState();
  const { isDemo } = useIsDemoMode();
  const key = `${appData["KEY"]}`;

  return React.useCallback(
    async (dataName: AppDataName, value: number) => {
      const url = new URL(`${window.location.origin}/update`);
      url.search = new URLSearchParams({
        [dataName]: `${value}`,
        key,
      }).toString();

      dispatch(
        actions.setAppStep({
          name: "SAVING",
          value: Date.now(),
        })
      );

      if (isDemo) {
        setTimeout(() => {
          dispatch(
            actions.setAppStep({
              name: "SAVING",
              clear: true,
            })
          );
        }, 1000);

        return;
      }

      try {
        await fetch(url.toString());
      } catch (e) {
        console.error(e);
      }

      setTimeout(() => {
        dispatch(
          actions.setAppStep({
            name: "SAVING",
            clear: true,
          })
        );
      }, 1000);
    },
    [dispatch, key, isDemo]
  );
};
