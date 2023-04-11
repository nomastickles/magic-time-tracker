import Box from "@mui/material/Box";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import IconButton from "@mui/material/IconButton";
import * as actions from "./actions";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppState } from "./hooks/useAppState";
import { useUpdateDataToServer } from "./hooks/useUpdateDataToServer";
import React from "react";

export default function Buttons() {
  const { appData, appStep } = useAppState();
  const dispatch = useAppDispatch();
  const updateDataToServer = useUpdateDataToServer();
  const [helpButtonIcon, setHelpButtonIcon] = React.useState<1 | 0>(0);
  const isSaving = !!appStep["SAVING"];
  const flagHelp = appData["FLAG_HELP"] === 1;

  React.useEffect(() => {
    if (!flagHelp) {
      setHelpButtonIcon(0);
      return;
    }

    setTimeout(() => {
      setHelpButtonIcon((prev) => {
        return prev === 1 ? 0 : 1;
      });
    }, 1000);
  }, [flagHelp, helpButtonIcon]);

  const iconStyle = { fontSize: "4rem" };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        onClick={() => {
          if (isSaving) {
            return;
          }
          const value = flagHelp ? 0 : 1;
          updateDataToServer("FLAG_HELP", value);
          dispatch(actions.setAppData({ name: "FLAG_HELP", value }));
        }}
      >
        <IconButton
          sx={{ color: "#fff", mt: "20px" }}
          aria-label="help"
          disabled={!flagHelp}
        >
          {/* switching between icons makes the little person wave */}
          {helpButtonIcon === 1 && <AccessibilityNewIcon sx={iconStyle} />}
          {helpButtonIcon === 0 && <AccessibilityIcon sx={iconStyle} />}
        </IconButton>
      </Box>
    </Box>
  );
}
