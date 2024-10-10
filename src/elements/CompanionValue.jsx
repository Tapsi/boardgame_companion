import { Typography } from "@mui/material"
import { useInstanceData } from "../InstanceData"

export default function CompanionValue(props) {
  const { id } = props
  const { value } = useInstanceData(id)

  return <Typography variant="body2">{value}</Typography>
}
