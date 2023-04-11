import React from "react";
import { useAppDispatch } from "./useAppDispatch";
import * as actions from "../actions";

const isDemo = !!process.env.REACT_APP_IS_DEMO;

export const useIsDemoMode = () => {
  const dispatch = useAppDispatch();

  // just to show things off
  React.useEffect(() => {
    if (isDemo) {
      dispatch(
        actions.setAppData({
          name: "TIMESTAMP_MAGIC",
          value: Date.now() - 1000 * 60 * 60 * 2,
        })
      );
      dispatch(
        actions.setAppData({
          name: "TIMESTAMP_WAKE",
          value: Date.now() - 1000 * 60 * 60 * 3,
        })
      );
    }
  }, [dispatch]);

  return {
    isDemo,
  };
};
