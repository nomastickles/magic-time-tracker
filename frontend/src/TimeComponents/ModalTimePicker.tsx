import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TimePicker from "./TimePicker";
import * as actions from "../actions";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppState } from "../hooks/useAppState";
import { AppDataName, AppStepName } from "../types";
import { useUpdateDataToServer } from "../hooks/useUpdateDataToServer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalTimePicker({
  modalStepName,
  dataName,
}: {
  modalStepName: AppStepName;
  dataName: AppDataName;
}) {
  const dispatch = useAppDispatch();
  const { appStep } = useAppState();
  const updateDataToServer = useUpdateDataToServer();
  const open = !!appStep[modalStepName];

  const handleClose = () =>
    dispatch(actions.setAppStep({ name: modalStepName, clear: true }));

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TimePicker
            onClose={() => {
              handleClose();
            }}
            onAccept={(incomingTimestamp) => {
              if (!incomingTimestamp) {
                return;
              }
              dispatch(
                actions.setAppData({
                  name: dataName,
                  value: incomingTimestamp,
                })
              );

              updateDataToServer(dataName, incomingTimestamp);
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
