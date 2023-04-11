import Box from "@mui/material/Box";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";

export default function TimePicker({
  onClose = () => {},
  onAccept = (timestamp: number | undefined) => {},
  defaultTimestamp = Date.now(),
}) {
  return (
    <Box>
      <StaticTimePicker
        sx={
          {
            // width: "400px",
            // height: "100px",
          }
        }
        defaultValue={dayjs(defaultTimestamp)}
        slotProps={{
          actionBar: {
            actions: ["cancel", "today", "accept"],
          },
        }}
        onClose={onClose}
        onAccept={(dJs) => {
          if (!dJs) {
            return;
          }
          onAccept(dJs?.unix() * 1000);
        }}
      />
    </Box>
  );
}
