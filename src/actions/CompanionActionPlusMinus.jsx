import { Button, ButtonGroup } from "@mui/material"
import { useInstanceData } from "../InstanceData"

export default function CompanionActionPlusMinus(props) {
  const { id } = props
  const { value, update } = useInstanceData(id)

  const handleIncrease = () => {
    update((Number(value) + 1).toString())
  }

  const handleDecrease = () => {
    update((Number(value) - 1).toString())
  }

  return (
    <ButtonGroup variant="text" aria-label="Small button group">
      <Button onClick={handleDecrease}>-</Button>
      <Button onClick={handleIncrease}>+</Button>
    </ButtonGroup>
  )
}
