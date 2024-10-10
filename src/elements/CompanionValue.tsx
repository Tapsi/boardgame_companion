import { Typography } from "@mui/material";
import { useInstanceData } from "../InstanceData";


export default function CompanionValue(props: { id: string, defaultValue: string }) {
  const { id } = props;
  const {value } = useInstanceData(id);

  return (
    <Typography variant="body2">
      {value}
    </Typography>
  );
}