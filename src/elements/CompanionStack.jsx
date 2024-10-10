import { Box, Stack } from "@mui/material"

export default function CompanionStack(props) {
  const { content, direction } = props

  return (
    <Stack direction={direction} spacing={2}>
      {content.map((element, index) => (
        <Box key={index} style={{ alignContent: "center" }}>
          {element}
        </Box>
      ))}
    </Stack>
  )
}
