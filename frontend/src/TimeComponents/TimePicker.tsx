import Box from "@mui/material/Box";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

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
        slotProps={{
          actionBar: {
            actions: ["cancel", "today", "accept"],
          },
        }}
        onClose={onClose}
        onAccept={(results) => {
          if (!results) {
            return;
          }
          const twentyFourHours = 1000 * 60 * 60 * 24;
          const now = Date.now();
          const temp = results as any;
          const date = new Date(temp["$d"]);
          let incomingTimestamp = date.getTime();

          if (incomingTimestamp > now) {
            // edge case
            incomingTimestamp -= twentyFourHours;
          }

          onAccept(incomingTimestamp);
        }}
      />
    </Box>
  );
}
