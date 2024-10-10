import { Typography } from "@mui/material";


export default function CompanionText(props: { text: string}) {
  const {text} = props;

  return (
    <Typography variant="body2">
      {text}
    </Typography>
  );
}