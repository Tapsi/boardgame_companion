import { Box, Stack } from "@mui/material";
import { ReactElement } from "react";

export default function CompanionStack(props: { content: ReactElement[], direction: "column" | "row" }) {
  const { content, direction } = props;
  
  return (
    <Stack direction={direction} spacing={2}>
      {content.map((element, index) => (
        <Box key={index} style={{ alignContent: "center"}}>{element}</Box>
      ))}
    </Stack>
  );
}
